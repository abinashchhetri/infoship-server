import { ICategory } from '@/interfaces/CategoryInterface'

import { ICompany } from '@/interfaces/ICompany'
import Icontact from '@/interfaces/IContact'
import { IProjectResponse } from '@/interfaces/IProject'
import { ITeamResponse } from '@/interfaces/ITeam'
import { ITestimonialResponse } from '@/interfaces/ITestimonial'
import { UserInterface } from '@/interfaces/UserInterface'
import { Document, Model } from 'mongoose'
import winston from 'winston'

declare global {
  namespace Models {
    export type userModel = Model<UserInterface & Document>
    export type logger = winston.Logger
    export type projectModel = Model<IProjectResponse & Document>
    export type category = Model<ICategory & Document>
    export type testimonial = Model<ITestimonialResponse & Document>
    export type team = Model<ITeamResponse & Document>

    export type companyDetail = Model<ICompany & Document>
    export type contact = Model<Icontact & Document>
  }
}
