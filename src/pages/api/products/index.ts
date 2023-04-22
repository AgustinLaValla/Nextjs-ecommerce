import { getProductsByGender, createProduct } from "@/infrastructure/controllers";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const responses = {
    'GET': () => getProductsByGender(req, res),
    'POST': () => createProduct(req, res)
  };

  const response = responses[req.method as keyof typeof responses];

  if (!response) return res.status(400).json({ message: 'Bad Request' });

  return response();

}