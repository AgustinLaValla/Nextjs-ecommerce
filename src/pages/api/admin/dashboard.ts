import { DashboardData } from "@/domain/models/DashboardData.model";
import { ordersServeService, productsServerService, userService } from "@/domain/services";
import { Order, Product, User } from "@/infrastructure/database/schemas";
import { ordersServerRepository, productsRepository } from "@/infrastructure/repositories";
import { userServerRepository } from "@/infrastructure/repositories";
import { NextApiRequest, NextApiResponse } from "next";


const productsService = productsServerService(productsRepository(Product));
const ordersService = ordersServeService(ordersServerRepository(Order, Product));
const usersService = userService(userServerRepository(User));

export default async function handler(req: NextApiRequest, res: NextApiResponse<DashboardData>) {

  const numberOfOrders = await ordersService.countOrders();
  const paidOrders = await ordersService.counterPaidOrders();
  const numberOfClients = await usersService.countClientUsers();
  const numberOfProducts = await productsService.countProducts();
  const productsWithNoInventory = await productsService.countProductsByStock(0);
  const lowInventory = await productsService.countProductsByStockLessThan(10);

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