import userModel from '@/models/userModel'
import dependencyInjector from './dependencyInjector'
import express, { ExpressLoaderType } from './express'
import Logger from './logger'
import mongo from './mongo'

export default async ({ server }: ExpressLoaderType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    express({ server })
    Logger.info('express loaded')

    await mongo()
    Logger.info('mongo connected')

    dependencyInjector([{ name: 'userModel', model: userModel }])
    Logger.info('dependency Injected')
  } catch (error) {
    throw error
  }
}
