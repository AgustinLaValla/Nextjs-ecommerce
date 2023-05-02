import { Order } from "@/domain/models";

export interface OrdersRepository {
  createOrder: (order: Order, userId: string) => Promise<Order>
  getOrders: () => Promise<Order[]>
  countOrders: () => Promise<number>
  counterPaidOrders: () => Promise<number>
}

