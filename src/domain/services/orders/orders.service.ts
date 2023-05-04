import { Order } from "@/domain/models";
import { OrdersRepository } from "@/domain/services";

export const ordersServeService = (ordersRepository: OrdersRepository) => ({
  createOrder: async (order: Order, userId: string) => ordersRepository.createOrder(order, userId),
  getOrders: async () => ordersRepository.getOrders(),
  countOrders: async () => ordersRepository.countOrders(),
  counterPaidOrders: async () => ordersRepository.counterPaidOrders(),
});

export const ordersClientService = (ordersRepository: Pick<OrdersRepository, 'createOrder'>) => ({
  createOrder: (order: Order) => ordersRepository.createOrder(order)
})