import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../helpers/config-env';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ysbk_images",
    format: async (req, file) => "png",
    public_id: (req, file) => file.originalname,
  }
})

export {
  cloudinary,
  storage,
}