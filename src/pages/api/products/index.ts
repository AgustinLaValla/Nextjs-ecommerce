import { getProductsByGender } from "@/infrastructure/controllers/products/products.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const responses = {
    'GET': () => getProductsByGender(req, res),
  };

  const response = responses[req.method as keyof typeof responses || 'default'];

  if (!response) return res.status(400).json({ message: 'Bad Request' });

  return response();

}