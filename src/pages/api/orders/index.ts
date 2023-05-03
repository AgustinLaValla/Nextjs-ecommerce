import { createOrder } from "@/infrastructure/controllers";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const responses = {
    // 'GET': () => getOrders(req, res),
    'POST': () => createOrder(req, res)
  };

  const response = responses[req.method as keyof typeof responses];
  if (!response) return res.status(400).json({ message: 'No route found' });

  return response();

}