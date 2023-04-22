import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ordersServeService } from "@/domain/services";
import { ErrorWidthCode, Order as OrderModel } from "@/domain/models";
import { Order, Product } from "@/infrastructure/database/schemas";
import { ordersServerRepository } from "@/infrastructure/repositories";
import { throw500Error } from "../utils";
import { getServerSession } from "next-auth";

const service = ordersServeService(ordersServerRepository(Order, Product))

export const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});
  if (!session) return res.status(400).json({ message: 'Must be authenticated' });

  const { _id: userId } = session.user as any;

  try {
    const order = await service.createOrder(req.body as OrderModel, userId);
    return res.status(201).json(order);
  } catch (error) {
    if (error instanceof ErrorWidthCode)
      return res.status(error.code).json({ message: error.message });
    return throw500Error(res);
  }

}

export const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});
  if (!session) return res.status(400).json({ message: 'Must be authenticated' });

  try {
    const orders = await service.getOrders();
    return res.status(200).json(orders);
  } catch (error) {
    if (error instanceof ErrorWidthCode)
      return res.status(error.code).json({ message: error.message });
    return throw500Error(res);
  }
}