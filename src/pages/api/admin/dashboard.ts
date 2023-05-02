import { ordersServeService, productsServerService, userService } from "@/domain/services";
import { Order, Product, User } from "@/infrastructure/database/schemas";
import { ordersServerRepository, productsRepository } from "@/infrastructure/repositories";
import { userServerRepository } from "@/infrastructure/repositories/user.repositoy";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  numberOfOrders: number;
  paidOrders: number; // isPad true
  notPaidOrders: number;
  numberOfClients: number; // role: client
  numberOfProducts: number;
  productsWithNoInventory: number; // 0
  lowInventory: number; // productos con 10 o menos
}

const productsService = productsServerService(productsRepository(Product));
const ordersService = ordersServeService(ordersServerRepository(Order, Product));
const usersService = userService(userServerRepository(User));

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    ordersService.countOrders(),
    ordersService.counterPaidOrders(),
    usersService.countClientUsers(),
    productsService.countProducts(),
    productsService.countProductsByStock(0),
    productsService.countProductsByStockLessThan(10)
  ]);

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders: numberOfOrders - paidOrders
  })
}