import formidable from "formidable";
import { UploadRepository } from "./uploadRepository.interface";

export const uploadService = (uploadRepository: UploadRepository) => ({
  saveFile: (file: formidable.File) => uploadRepository.saveFile(file)
});