// import {
//   // forgotPasswordSchema,
//   // loginSchema,
//   // resetPasswordSchema,
// } from '@/schema/schemaValidation'
import AuthService from '@/services/AuthService'
// import { celebrate } from 'celebrate'
import { NextFunction, Request, Response, Router } from 'express'
import Container from 'typedi'
import { RouterPropsType } from '../types'

// import { attachCurrentUser } from '@/api/middlewares/attachCurrentUser'
// import { isAuth } from '@/api/middlewares/isAuth'
import { IUser } from '@/interfaces'
// import Logger from '@/loaders/logger'

const authRouter = Router()
export default ({ router }: RouterPropsType) => {
  router.use('/auth', authRouter)

  authRouter.post(
    '/register-student',
    async (req: Request, res: Response, next: NextFunction) => {
      const userDetails: IUser = req.body
      try {
        const authService = Container.get(AuthService)
        const newUser = await authService.registerStudent(userDetails)
        res.status(200).json({ success: true, user: newUser }).end()
      } catch (error) {
        next(error)
      }
    }
  )

  // //for the login
  // authRouter.post(
  //   '/login',

  //   celebrate({ body: loginSchema }),
  //   async (req, res, next) => {
  //     const { email, password, cv, profilePicture }: IUser = req.body
  //     Logger.info(email, password)

  //     try {
  //       const authService = Container.get(AuthService)

  //       const data = await authService.login(email, password)

  //       res.status(200).json(data)
  //     } catch (error) {
  //       next(error)
  //     }
  //   }
  // )

  //route for token validation
  // type CustomRequest = Request & {
  //   currentUser: UserInterface
  // }
  // authRouter.get(
  //   '/me',
  //   isAuth,
  //   attachCurrentUser,
  //   (req: CustomRequest, res: Response) => {
  //     res.json(req.currentUser).status(200)
  //   }
  // )

  // // route for forget password
  // authRouter.post(
  //   '/forgotpassword',
  //   celebrate({ body: forgotPasswordSchema }),
  //   async (req, res, next) => {
  //     const { email, masterKey } = req.body
  //     try {
  //       const authService = Container.get(AuthService)
  //       await authService.validateMasterkey(email, masterKey)
  //       res.status(200).end()
  //     } catch (error) {
  //       next(error)
  //     }
  //   }
  // )

  // // route for reset pasword

  // authRouter.post(
  //   '/resetpassword',
  //   celebrate({ body: resetPasswordSchema }),
  //   async (req, res, next) => {
  //     const { email, masterKey, newPassword } = req.body
  //     try {
  //       const authService = Container.get(AuthService)
  //       await authService.resetPassword(email, masterKey, newPassword)
  //       res.status(200).end()
  //     } catch (error) {
  //       next(error)
  //     }
  //   }
  // )
}
