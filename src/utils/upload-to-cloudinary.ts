import cloudinary from 'cloudinary'
import multer from 'multer'

export const upload_to_cloudinary = multer({storage: multer.memoryStorage()})

