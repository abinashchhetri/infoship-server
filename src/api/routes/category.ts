import {
  addCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
} from '@/schema/schemaValidation'
import { CategoryService } from '@/services/CategoryService'
import { celebrate } from 'celebrate'
import { Router } from 'express'
import Container from 'typedi'
import { attachCurrentUser, isAuth } from '../middlewares'
import { RouterPropsType } from '../types'

const categoryRouter = Router()
export default ({ router }: RouterPropsType) => {
  router.use('/category', categoryRouter)

  categoryRouter.post(
    '',
    isAuth,
    attachCurrentUser,
    celebrate({ body: addCategorySchema }),
    async (req, res, next) => {
      const { name } = req.body

      const categoryService = Container.get(CategoryService)

      try {
        await categoryService.addCategory(name)
        return res.status(201).end()
      } catch (error) {
        next(error)
      }
    }
  )

  categoryRouter.get('', async (req, res, next) => {
    const categoryService = Container.get(CategoryService)
    try {
      const categories = await categoryService.getCategory()
      return res.status(200).json(categories).end()
    } catch (error) {
      next(error)
    }
  })

  categoryRouter.patch(
    '',
    isAuth,
    attachCurrentUser,
    celebrate({ body: editCategorySchema }),
    async (req, res, next) => {
      const { categoryId, name } = req.body

      const categoryService = Container.get(CategoryService)
      try {
        await categoryService.editcategory(categoryId, name)
        res.status(204).end()
      } catch (error) {
        next(error)
      }
    }
  )

  categoryRouter.delete(
    '',
    isAuth,
    attachCurrentUser,
    celebrate({ body: deleteCategorySchema }),
    async (req, res, next) => {
      const { categoryId } = req.body
      const categoryService = Container.get(CategoryService)

      try {
        await categoryService.deleteCategory(categoryId)
        res.status(204).end()
      } catch (error) {
        next(error)
      }
    }
  )
}
