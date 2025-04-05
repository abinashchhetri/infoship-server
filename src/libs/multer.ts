import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDirectory = path.resolve(__dirname, '../upload/')
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory)
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

export default upload
