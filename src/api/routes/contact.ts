import { Router } from 'express'
import { RouterPropsType } from '../types'
// import Icontact from '@/interfaces/IContact'
import Container from 'typedi'
import ContactService from '@/services/ContactService'
import Icontact from '@/interfaces/IContact'
import { attachCurrentUser, isAuth } from '../middlewares'
import { celebrate } from 'celebrate'
import {
  addContactSchema,
  deleteContactSchema,
  toggleViewStatusSchema,
} from '@/schema/schemaValidation'

const contactRouter = Router()
export default ({ router }: RouterPropsType) => {
  router.use('/contact', contactRouter)

  contactRouter.get('', async (req, res, next) => {
    try {
      const contactService = Container.get(ContactService)
      const contacts = await contactService.getContact()
      return res.status(200).json(contacts).end()
    } catch (error) {
      next(error)
    }
  })

  contactRouter.post(
    '',
    celebrate({ body: addContactSchema }),
    async (req, res, next) => {
      const data: Icontact = req.body
      const contactService = Container.get(ContactService)

      try {
        await contactService.addContact(data)
        return res.status(201).end()
      } catch (error) {
        next(error)
      }
    }
  )

  contactRouter.patch(
    '/togleviewstatus',
    isAuth,
    attachCurrentUser,
    celebrate({ body: toggleViewStatusSchema }),
    async (req, res, next) => {
      const { _id }: { _id: string } = req.body

      const contactService = Container.get(ContactService)
      try {
        await contactService.toggleViewStatus(_id)
        return res.status(201).end()
      } catch (error) {
        next(error)
      }
    }
  )

  contactRouter.delete(
    '',
    isAuth,
    attachCurrentUser,
    celebrate({ body: deleteContactSchema }),
    async (req, res, next) => {
      const _id = req.body
      const contactService = Container.get(ContactService)
      try {
        await contactService.deleteContact(_id)
        return res.status(201).end()
      } catch (error) {
        next(error)
      }
    }
  )
}
