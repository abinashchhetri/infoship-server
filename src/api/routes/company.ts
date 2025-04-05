import { ICompany } from '@/interfaces/ICompany'
import { editCompanyDetails } from '@/schema/schemaValidation'
import CompanyService from '@/services/CompanyService'
import { celebrate } from 'celebrate'
import { Router } from 'express'
import Container from 'typedi'
import { attachCurrentUser, isAuth } from '../middlewares'
import { RouterPropsType } from '../types'

export const companyRoute = Router()

export default ({ router }: RouterPropsType) => {
  router.use('/company', companyRoute)

  companyRoute.get('', async (req, res, next) => {
    const companyService = Container.get(CompanyService)
    try {
      const companyDetails = await companyService.getCompanyDetais()
      return res.status(200).json(companyDetails).end()
    } catch (error) {
      next(error)
    }
  })

  companyRoute.patch(
    '',
    isAuth,
    attachCurrentUser,
    celebrate({ body: editCompanyDetails }),
    async (req, res, next) => {
      const userData: ICompany = req.body

      const companyService = Container.get(CompanyService)
      try {
        await companyService.editCompanyDetails(userData)
        return res.status(200).end()
      } catch (error) {
        next(error)
      }
    }
  )
}
