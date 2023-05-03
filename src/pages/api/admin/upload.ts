import { NextApiRequest, NextApiResponse } from "next";
import { saveFile } from "@/infrastructure/controllers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(400).json({ message: 'No route found' });

  return saveFile(req, res);
}