import { IDeleteProject, IProjectRequest } from '@/interfaces/IProject'
import { deleteOnCloudinary, uploadOnCloudinary } from '@/libs/cloudinary'
import mongoose from 'mongoose'
import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

@Service()
export default class ProjectServices {
  constructor(
    @Inject('projectModel') private projectModel: Models.projectModel,
    @Inject('logger') private logger: Logger,
    @Inject('categoryModel') private categoryModel: Models.category
  ) {}

  // if the category id is empty it will return all the projects
  public async getProjectByCategory(categoryId: string) {
    let query = {}
    if (categoryId) {
      query = {
        category: categoryId,
      }
    }
    const project = await this.projectModel.find(query)
    return project
  }

  public async getProjectById(projectId: string) {
    if (!mongoose.isValidObjectId(projectId)) {
      const error = new Error("Project deson't exists")
      error['status'] = 404
      throw error
    }
    return await this.projectModel.findById(projectId)
  }
  public async uploadProject(data: IProjectRequest) {
    // first check if the category exists
    if (!mongoose.isValidObjectId(data.category)) {
      const error = new Error("Category deson't exists")
      error['status'] = 404
      throw error
    }
    const category = await this.categoryModel.findOne({ _id: data.category })
    if (!category) {
      const error = new Error("Category deson't exists")
      error['status'] = 404
      throw error
    }
    const project = new this.projectModel()
    project.title = data.title
    project.category = data.category
    data.images.forEach(async (image) => {
      const coludinaryImage = await uploadOnCloudinary(image.path)
      project.images.push({
        id: coludinaryImage.public_id,
        url: coludinaryImage.secure_url,
      })
    })
    const coverPhoto = await uploadOnCloudinary(data.coverPhoto[0].path)
    project.coverPhoto = {
      id: coverPhoto.public_id,
      url: coverPhoto.secure_url,
    }
    await project.save()
  }

  public async editProject(data: IProjectRequest) {
    const prevProject = await this.projectModel.findOne({
      _id: data._id,
    })
    prevProject.title = data.title
    prevProject.category = data.category
    if (data.coverPhoto) {
      await deleteOnCloudinary(
        prevProject.coverPhoto.id,
        data.coverPhoto[0].path
      )
      const newCoverPhoto = await uploadOnCloudinary(data.coverPhoto[0].path)
      prevProject.coverPhoto = {
        id: newCoverPhoto.public_id,
        url: newCoverPhoto.secure_url,
      }
    }
    if (data.images && data.images.length > 0) {
      for (const image in data.images) {
        const cloudinaryImages = await uploadOnCloudinary(
          data.images[image].path
        )
        prevProject.images.push({
          id: cloudinaryImages.public_id,
          url: cloudinaryImages.secure_url,
        })
      }
    }
    if (data.deletePhoto && data.deletePhoto.length > 0) {
      let filteredImages = []
      filteredImages = prevProject.images.filter(
        ({ id }) => !data.deletePhoto.includes(id)
      )
      prevProject.images = filteredImages
    }
    await prevProject.save()
  }

  public async deleteProject(data: IDeleteProject) {
    const project = await this.projectModel.findOne({ _id: data.id })
    if (project) {
      await deleteOnCloudinary(project.coverPhoto.id)
      project.images.forEach(async (image) => {
        await deleteOnCloudinary(image.id)
      })
      await this.projectModel.deleteOne({ _id: data.id })
    } else {
      const error = new Error("project doesn't exist")
      throw error
    }
  }
}
