import { Order } from "@/domain/models";
import { OrdersRepository } from "@/domain/services";

export const ordersServeService = (ordersRepository: OrdersRepository) => ({
  createOrder: async (order: Order) => ordersRepository.createOrder(order),
  getOrders: async () => ordersRepository.getOrders()
});