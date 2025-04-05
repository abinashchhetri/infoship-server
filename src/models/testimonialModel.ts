import { ITestimonialResponse } from '@/interfaces/ITestimonial'
import mongoose, { Document } from 'mongoose'

const testimonial = new mongoose.Schema({
  profilePhoto: {
    id: { type: String, require: true },
    url: { type: String, require: true },
  },
  role: { type: String, require: true },
  review: { type: String, require: true },
  name: { type: String, require: true },
})

export default mongoose.model<ITestimonialResponse | Document>(
  'Testimonial',
  testimonial
)
