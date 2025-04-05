import Icontact from '@/interfaces/IContact'
import mongoose, { Document } from 'mongoose'

const contact = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    match: [/.+@.+\..+/, 'Please enter a valid email addres'],
    index: true,
  },
  constactNumber: {
    type: Number,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },

  viewed: {
    type: Boolean,
    default: false,
    require: true,
  },
})

export default mongoose.model<Icontact & Document>('Contact', contact)
