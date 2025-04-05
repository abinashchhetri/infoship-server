import categoryModel from '@/models/categoryModel'
import companyModel from '@/models/companyModel'
import projectModel from '@/models/projectModel'
import teamModel from '@/models/teamModel'
import testimonialModel from '@/models/testimonialModel'
import userModel from '@/models/userModel'
import dependencyInjector from './dependencyInjector'
import express, { ExpressLoaderType } from './express'
import Logger from './logger'
import mongo from './mongo'
import contactModel from '@/models/contactModel'
export default async ({ server }: ExpressLoaderType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    express({ server })
    Logger.info('express loaded')

    await mongo()
    Logger.info('mongo connected')

    dependencyInjector([
      { name: 'userModel', model: userModel },
      { name: 'projectModel', model: projectModel },
      { name: 'categoryModel', model: categoryModel },
      { name: 'testimonialModel', model: testimonialModel },
      { name: 'teamModel', model: teamModel },
      { name: 'companyDetailModel', model: companyModel },
      { name: 'contactModel', model: contactModel },
    ])
    Logger.info('dependency Injected')
  } catch (error) {
    throw error
  }
}
