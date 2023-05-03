import formidable from 'formidable';

export interface UploadRepository {
  saveFile: (file: formidable.File) => Promise<string>
}