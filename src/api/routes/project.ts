import { attachCurrentUser, isAuth } from '@/api/middlewares'
import { IProjectRequest } from '@/interfaces/IProject'
import upload from '@/libs/multer'
import { deleteProjectSchema } from '@/schema/schemaValidation'
import ProjectServices from '@/services/ProjectServices'
import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'
import Container from 'typedi'
import { RouterPropsType } from '../types'

const projectRouter = Router()
export default ({ router }: RouterPropsType) => {
  router.use('/projects', projectRouter)

  projectRouter.get(
    '/all',
    celebrate({
      query: Joi.object({ categoryId: Joi.string().required().allow('') }),
    }),
    async (req, res, next) => {
      try {
        const { categoryId } = req.query as { categoryId: string }
        const projects =
          await Container.get(ProjectServices).getProjectByCategory(categoryId)
        return res.status(200).json(projects)
      } catch {
        const error = new Error('cant get projects')
        next(error)
      }
    }
  )

  projectRouter.get(
    '',
    celebrate({
      query: Joi.object({ projectId: Joi.string().required() }),
    }),
    async (req, res, next) => {
      try {
        const { projectId } = req.query as { projectId: string }
        const projects =
          await Container.get(ProjectServices).getProjectById(projectId)
        return res.status(200).json(projects)
      } catch {
        const error = new Error('cant get projects')
        next(error)
      }
    }
  )

  projectRouter.post(
    '',
    isAuth,
    attachCurrentUser,
    upload.fields([
      { name: 'images', maxCount: 10 }, // 'images' can accept up to 10 files
      { name: 'coverPhoto', maxCount: 1 }, // 'coverPhoto' accepts only 1 file
    ]),
    celebrate({
      body: Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
      }).options({ abortEarly: false }),
    }),
    async (req, res, next) => {
      const { title, category } = req.body
      const files = req.files as {
        coverPhoto?: Express.Multer.File[]
        images?: Express.Multer.File[]
      }

      if (!files.coverPhoto || files.coverPhoto.length === 0) {
        const error = new Error('Cover photo is required')
        error['status'] = 400
        next(error)
      }

      const project: IProjectRequest = {
        category,
        title,
        coverPhoto: files.coverPhoto,
        images: files.images,
      }
      try {
        const projectServices = Container.get(ProjectServices)
        await projectServices.uploadProject(project)
        return res.status(201).end()
      } catch (error) {
        next(error)
      }
    }
  )

  projectRouter.patch(
    '',
    isAuth,
    attachCurrentUser,
    upload.fields([
      { name: 'images', maxCount: 10 }, // 'images' can accept up to 10 files
      { name: 'coverPhoto', maxCount: 1 }, // 'coverPhoto' accepts only 1 file
    ]),
    celebrate({
      body: Joi.object({
        _id: Joi.string().required(),
        title: Joi.string().required(),
        category: Joi.string().required(),
        deletePhoto: Joi.array().items(Joi.string()),
      }).options({ abortEarly: false }),
    }),
    async (req, res, next) => {
      const { _id, title, category, deletePhoto } = req.body
      const files = req.files as {
        coverPhoto?: Express.Multer.File[]
        images?: Express.Multer.File[]
      }
      const project: IProjectRequest = {
        _id,
        title,
        category,
        deletePhoto,
        coverPhoto: files.coverPhoto,
        images: files.images,
      }
      try {
        const projectService = Container.get(ProjectServices)
        await projectService.editProject(project)
        return res.status(200).end()
      } catch (error) {
        next(error)
      }
    }
  )

  projectRouter.delete(
    '',
    isAuth,
    attachCurrentUser,
    celebrate({ body: deleteProjectSchema }),
    async (req, res, next) => {
      const { id } = req.body
      const projectService = Container.get(ProjectServices)
      try {
        await projectService.deleteProject({ id })
        return res.status(204).end()
      } catch (error) {
        next(error)
      }
    }
  )
}
