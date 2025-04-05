import TestimonialService from '@/services/TestimonialService'
import { Router } from 'express'
import Container from 'typedi'
import { attachCurrentUser, isAuth } from '../middlewares'
import { RouterPropsType } from '../types'

import upload from '@/libs/multer'
import {
  addTestimonialSchema,
  deleteTestimonialSchema,
  editTestimonialSchema,
} from '@/schema/schemaValidation'
import { celebrate } from 'celebrate'
import { ITestimonial } from '@/interfaces/ITestimonial'

const testimonialRouter = Router()
export default ({ router }: RouterPropsType) => {
  router.use('/testimonial', testimonialRouter)

  testimonialRouter.get(
    '',

    async (req, res, next) => {
      const testimonialService = Container.get(TestimonialService)
      try {
        const testimonials = await testimonialService.getTestimonial()
        res.status(200).json(testimonials)
      } catch (error) {
        next(error)
      }
    }
  )

  testimonialRouter.post(
    '',

    upload.single('profilePhoto'),
    isAuth,
    attachCurrentUser,
    celebrate({ body: addTestimonialSchema }),
    async (req, res, next) => {
      const { name, role, review } = req.body

      const testimonialService = Container.get(TestimonialService)
      try {
        const profilePhoto = req.file as Express.Multer.File | undefined
        await testimonialService.addTestimonial({
          name,
          role,
          review,
          profilePhoto,
        })
        res.status(201).end()
      } catch (error) {
        next(error)
      }
    }
  )

  testimonialRouter.delete(
    '',
    isAuth,
    attachCurrentUser,
    celebrate({ body: deleteTestimonialSchema }),
    async (req, res, next) => {
      const { id } = req.body
      const testimonialService = Container.get(TestimonialService)
      try {
        await testimonialService.deleteTestimonial(id)
        res.status(204).end()
      } catch (error) {
        next(error)
      }
    }
  )

  testimonialRouter.patch(
    '',
    isAuth,
    attachCurrentUser,
    upload.single('profilePhoto'),
    celebrate({ body: editTestimonialSchema }),
    async (req, res, next) => {
      const data: ITestimonial = req.body

      const file = req.file as Express.Multer.File | undefined

      const testimonialService = Container.get(TestimonialService)

      try {
        await testimonialService.updateTestimonial(data, file)
        return res.status(200).end()
      } catch (error) {
        next(error)
      }
    }
  )
}
