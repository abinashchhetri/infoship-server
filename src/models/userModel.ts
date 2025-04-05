import { IUser } from '@/interfaces'

import mongoose, { Document } from 'mongoose'

const user = new mongoose.Schema<IUser & Document>(
  {
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email addres'],
      index: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: {
        url: String,
        public_id: String,
      },
    },
    cv: {
      type: {
        url: String,
        public_id: String,
      },
    },
  },
  { timestamps: true }
)

export default mongoose.model<IUser | mongoose.Document>('User', user)
