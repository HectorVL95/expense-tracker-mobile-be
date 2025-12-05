import cloudinary from 'cloudinary'
import multer from 'multer'

export const upload = multer({storage: multer.memoryStorage()})

