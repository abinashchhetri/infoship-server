import config from '@/config'
import Logger from '@/loaders/logger'

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

import fs from 'fs'

// Configuration
cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
})

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (localFilePath) {
      const response: UploadApiResponse = await cloudinary.uploader.upload(
        localFilePath,
        {
          resource_type: 'auto',
        }
      )
      Logger.silly('reached here one ')
      return response
    }
  } catch {
    const error = new Error('Failed to upload images')
    error['status'] = 500
    throw error
  } finally {
    fs.unlinkSync(localFilePath)
  }
}

const deleteOnCloudinary = async (publicId: string, localFilePath?: string) => {
  try {
    if (publicId) {
      const data = await cloudinary.uploader.destroy(publicId)
      // if (data.result === 'not found') {
      //   throw new Error('Image is not in the server ')
      // }

      return data
    }
  } catch (error) {
    if (localFilePath) {
      try {
        fs.unlinkSync(localFilePath)
      } catch {
        // do nothing
      }
    }
    error['message'] = error.message || "couldn't delete image "
    error['status'] = 500
    throw error
  }
}

export { uploadOnCloudinary, deleteOnCloudinary }
