import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../service/cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'quiz_files',
    allowed_formats: ['pdf', 'doc', 'docx', 'txt'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

export const upload = multer({ storage: storage });