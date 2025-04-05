import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

export default {
  port: process.env.PORT,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  mongoApi: process.env.DATABASE_API || '',
  jwtSecret: process.env.JWT_SECRET as string,
  jwtAlgorithm: process.env.JWT_ALGO as string,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinaryApiKey: process.env.CLOOUDINARY_API_KEY as string,
  cloudinaryApiSecret: process.env.CLOOUDINARY_API_SECRET as string,
  masterKey: process.env.MASTERKEY as string,
  key: crypto.randomBytes(32),
  iv: crypto.randomBytes(16),
}
