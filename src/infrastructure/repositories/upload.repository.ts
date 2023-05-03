import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import { UploadRepository } from "@/domain/services";


cloudinary.config(process.env.CLOUDINARY_URL || '');

export const uploadRepository = (): UploadRepository => ({
  saveFile: async (file: formidable.File) => {
    const { secure_url } = await cloudinary.uploader.upload(file.filepath);
    return secure_url;
  }
});