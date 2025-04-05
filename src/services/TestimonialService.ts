import { ITestimonial } from '@/interfaces/ITestimonial'
import { deleteOnCloudinary, uploadOnCloudinary } from '@/libs/cloudinary'
import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

@Service()
export default class TestimonialService {
  constructor(
    @Inject('testimonialModel') private testimonialModel: Models.testimonial,
    @Inject('logger') private logger: Logger
  ) {}

  public async getTestimonial() {
    return await this.testimonialModel.find({})
  }

  public async addTestimonial(data: {
    profilePhoto: Express.Multer.File
    name: string
    role: string
    review: string
  }) {
    const { public_id, secure_url } = await uploadOnCloudinary(
      data.profilePhoto.path
    )
    await this.testimonialModel.create({
      name: data.name,
      role: data.role,
      review: data.review,
      profilePhoto: {
        id: public_id,
        url: secure_url,
      },
    })
  }

  public async deleteTestimonial(id: string) {
    const testimonial = await this.testimonialModel.findOne({
      _id: id,
    })
    if (!testimonial) {
      const error = new Error("The requested data dosn't exist")
      error['status'] = 404
      throw error
    } else {
      await deleteOnCloudinary(testimonial.profilePhoto.id)
      const response = await this.testimonialModel.deleteOne({ _id: id })

      if (response.acknowledged == false) {
        const error = new Error("Couldn't delete testimonial")
        error['status'] = 404
        throw error
      }
    }
  }

  public async updateTestimonial(
    data: ITestimonial,
    file: Express.Multer.File | undefined
  ) {
    const prevTestimonial = await this.testimonialModel.findById(data._id)
    if (!prevTestimonial) {
      const error = new Error('No testimonial found')
      error['status'] = 401
      throw error
    }

    if (data.name) prevTestimonial.name = data.name
    if (data.role) prevTestimonial.role = data.role
    if (data.review) prevTestimonial.review = data.review

    if (file) {
      await deleteOnCloudinary(prevTestimonial.profilePhoto.id, file.path)
      const { public_id, url } = await uploadOnCloudinary(file.path)
      prevTestimonial.profilePhoto.id = public_id
      prevTestimonial.profilePhoto.url = url
    }

    await prevTestimonial.save()
  }
}
