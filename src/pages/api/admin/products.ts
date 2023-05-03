import { NextApiRequest, NextApiResponse } from "next";
import { createProduct, getSortedProducts, updateProduct } from "@/infrastructure/controllers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const responses = {
    'GET': () => getSortedProducts(req, res),
    'POST': () => createProduct(req, res),
    'PUT': () => updateProduct(req, res)
  };

  const response = responses[req.method as keyof typeof responses];

  if (!response) return res.status(402).json({ message: 'No route found' });

  return response();
}