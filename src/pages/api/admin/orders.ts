import { ordersServeService } from "@/domain/services";
import { Order, Product } from "@/infrastructure/database/schemas";
import { ordersServerRepository } from "@/infrastructure/repositories";
import { NextApiRequest, NextApiResponse } from "next";


const service = ordersServeService(ordersServerRepository(Order, Product));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const responses = {
    'GET': () => service.getOrders()
  }

  const response = responses[req.method as keyof typeof responses];
  if(!response) return res.status(400).json({message: 'No route found'});

  return response();

}