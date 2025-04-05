import { encryption } from '@/api/middlewares/encryption'
import bcrypt from 'bcrypt'
import config from '@/config'
import { UserInterface } from '@/interfaces/UserInterface'
import jwt from 'jsonwebtoken'
import { Inject, Service } from 'typedi'

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel: Models.userModel,
    @Inject('logger') private logger: Models.logger
  ) {}

  //this function handels login

  public async login(email: string, password: string) {
    const userData = await this.userModel.findOne({ email: email })
    if (!userData) {
      const error = new Error('email dosnt exist')
      error['status'] = 401
      throw error
    } else {
      if (!(await bcrypt.compare(password, userData.password))) {
        const error = new Error("email and password doesn't match")
        error['status'] = 401
        throw error
      }
      const user = userData.toObject()
      Reflect.deleteProperty(user, 'password')
      const token = this.generateToken(user)
      return { user, token }
    }
  }

  // function to handel forget password
  public async validateMasterkey(email: string, masterkey: string) {
    const userData = await this.userModel.findOne({ email: email })

    if (!userData) {
      const error = new Error('email dosnt exist')
      error['status'] = 401
      throw error
    } else {
      if (masterkey !== config.masterKey) {
        const error = new Error("email and masterkey doesn't match")
        error['status'] = 401
        throw error
      }
    }
  }

  private generateToken(user: UserInterface) {
    return jwt.sign(
      user,
      config.jwtSecret,

      { expiresIn: '1hr' }
    )
  }

  // function to reset password
  public async resetPassword(
    email: string,
    masterKey: string,
    newPassword: string
  ) {
    const userData = await this.userModel.findOne({ email: email })

    if (!userData) {
      const error = new Error('email dosnt exist')
      error['status'] = 401
      throw error
    } else {
      if (masterKey !== config.masterKey) {
        const error = new Error("email and masterkey doesn't match")
        error['status'] = 401
        throw error
      }
      const encryptedPassword = await encryption(newPassword)

      await this.userModel.updateOne(
        { email },
        { $set: { password: encryptedPassword } }
      )
    }
  }
}
