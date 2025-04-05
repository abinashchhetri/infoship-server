import { IUser } from '@/interfaces'
import { Document, Model } from 'mongoose'

declare global {
  namespace Models {
    export type userModel = Model<IUser & Document>
  }
}
