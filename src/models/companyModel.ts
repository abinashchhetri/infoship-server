import { ICompany } from '@/interfaces/ICompany'

import mongoose from 'mongoose'

const companyDetails = new mongoose.Schema({
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Please enter a valid email addres'],
    index: true,
  },
  address: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  facebookLink: {
    type: String,
    require: true,
  },
  tiktokLink: {
    type: String,
    require: true,
  },
  youtubeLink: {
    type: String,
    require: true,
  },
  instagramLink: {
    type: String,
    require: true,
  },
})

export default mongoose.model<ICompany | mongoose.Document>(
  'CompanyDetails',
  companyDetails
)
