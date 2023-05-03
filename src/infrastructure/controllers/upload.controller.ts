import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { uploadService } from "@/domain/services";
import { uploadRepository } from "@/infrastructure/repositories";

const service = uploadService(uploadRepository());

const parseFiles = async (req: NextApiRequest): Promise<string> => {

  return new Promise((resolve, reject) => {

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      // console.log({ err, fields, files });

      if (err) {
        return reject(err);
      }

      const filePath = await service.saveFile(files.file as formidable.File);
      resolve(filePath);
    })

  })

}


export const saveFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const imageUrl = await parseFiles(req);

  return res.status(200).json({ message: imageUrl });
}