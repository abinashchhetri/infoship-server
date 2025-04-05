import { IProjectResponse } from '@/interfaces/IProject'

import mongoose from 'mongoose'

const project = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  images: {
    type: [
      {
        id: { type: String, require: true },
        url: { type: String, require: true },
      },
    ],
    require: true,
  },
  category: { type: String, require: true },
  coverPhoto: {
    id: { type: String, require: true },
    url: { type: String, require: true },
  },
})

export default mongoose.model<IProjectResponse | mongoose.Document>(
  'Project',
  project
)
