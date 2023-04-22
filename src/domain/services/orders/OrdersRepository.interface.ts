import { Order } from "@/domain/models";

export interface OrdersRepository {
  createOrder: (order: Order) => Promise<Order>
  getOrders: () => Promise<Order[]>
}

