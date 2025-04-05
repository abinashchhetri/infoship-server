import config from '@/config'
import { Request } from 'express'
import { expressjwt } from 'express-jwt'

const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

export const isAuth = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  getToken: getTokenFromHeader,
})
