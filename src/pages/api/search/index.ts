import { searchProductByTerm } from "@/infrastructure/controllers/products/products.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(404).json({
    message: 'No route found'
  });

  return searchProductByTerm(req, res);
}