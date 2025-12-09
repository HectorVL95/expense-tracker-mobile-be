import { v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET

})

export const upload_to_cloudinary = async(file: Express.Multer.File, folder: string ) => {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {folder},
      (error, result) => {
        if (error) return reject(error)
          resolve(result!.secure_url)
      }
    ).end(file.buffer)
  })
}
