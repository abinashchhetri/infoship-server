import { Router } from 'express'
import { RouterPropsType } from '../types'
import Container from 'typedi'
import TeamService from '@/services/TeamService'
import { attachCurrentUser, isAuth } from '../middlewares'
import { celebrate } from 'celebrate'
import {
  addTeamSchema,
  deleteTeamSchema,
  updateTeamSchema,
} from '@/schema/schemaValidation'
import upload from '@/libs/multer'

const teamRouter = Router()

export default ({ router }: RouterPropsType) => {
  router.use('/team', teamRouter)

  teamRouter.get('/getteam', async (req, res, next) => {
    const teamService = Container.get(TeamService)
    try {
      const teams = await teamService.getTeam()
      res.status(200).json(teams)
    } catch (error) {
      next(error)
    }
  })

  teamRouter.post(
    '/addteam',
    isAuth,
    attachCurrentUser,
    upload.single('image'),
    celebrate({ body: addTeamSchema }),

    async (req, res, next) => {
      const { name, role } = req.body

      const teamService = Container.get(TeamService)

      try {
        const image = req.file as Express.Multer.File | undefined
        await teamService.addTeam({ name, role, image })
        res.status(201).end()
      } catch (error) {
        next(error)
      }
    }
  )

  teamRouter.delete(
    '/deleteteam',
    isAuth,
    attachCurrentUser,
    celebrate({ body: deleteTeamSchema }),
    async (req, res, next) => {
      const { id } = req.body
      const teamService = Container.get(TeamService)
      try {
        await teamService.deleteTeam(id)
        res.status(204).end()
      } catch (error) {
        next(error)
      }
    }
  )

  teamRouter.patch(
    '/updateteam',
    isAuth,
    attachCurrentUser,
    upload.single('image'),
    celebrate({ body: updateTeamSchema }),
    async (req, res, next) => {
      const { id, role, name } = req.body

      const image = req.file as Express.Multer.File | undefined

      const teamService = Container.get(TeamService)

      const team = {
        id,
        name,
        role,
        image,
      }

      try {
        await teamService.updateTeam(team)
        return res.status(200).end()
      } catch (error) {
        next(error)
      }
    }
  )
}
