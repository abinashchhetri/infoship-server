import { ICategory } from '@/interfaces/CategoryInterface'
import mongoose from 'mongoose'

const category = new mongoose.Schema({
  name: {
    type: String,
    unique: true,

    index: true,
  },
})

export default mongoose.model<ICategory | mongoose.Document>(
  'Category',
  category
)
