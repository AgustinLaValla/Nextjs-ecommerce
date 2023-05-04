import { Model } from "mongoose";
import { ErrorWidthCode, Order } from "@/domain/models";
import { OrdersRepository } from "@/domain/services";
import { config } from "@/config/config";
import { IOrder, IProduct } from '@/infrastructure/database/schemas';
import { db } from "@/infrastructure/database";
import { http } from '@/infrastructure/adapters';
import { baseApi } from "../api";

export const ordersServerRepository = (

  orderModel: Model<IOrder>,
  productModel: Model<IProduct>,

): OrdersRepository => ({

  createOrder: async (order, userId?: string) => {

    if (!userId) throw new ErrorWidthCode(400, 'User ID should be provided')

    await db.connect();

    const { orderItems, total } = order;
    const productIds = orderItems.map(({ _id }) => _id);

    const dbProducts = await productModel.find({ _id: { $in: productIds } });

    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;

      if (!currentPrice) throw new ErrorWidthCode(400, 'Product does not exist. Please check the cart');

      return (currentPrice * current.quantity) + prev;
    }, 0);

    const taxRate = Number(config.taxRate);
    let backendTotal = subTotal * (taxRate + 1);
    backendTotal = Math.round(backendTotal * 100) / 100;


    if (total !== backendTotal)
      throw new Error('The total does not match the amount');


    const newOrder = new orderModel({ ...order, isPaid: false, user: userId });
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();
    await db.disconnect();

    return newOrder;
  },

  getOrders: async () => {
    await db.connect();

    const orders = await orderModel
      .find()
      .sort({ createdAt: 'desc' })
      .populate('user', 'user name')
      .lean();

    await db.disconnect();

    return orders;
  },

  countOrders: async () => {
    await db.connect();
    const qty = await orderModel.count();
    await db.disconnect();
    return qty;
  },

  counterPaidOrders: async () => {
    await db.connect();
    const qty = await orderModel.find({ isPaid: true }).count();
    await db.disconnect();
    return qty;
  }
});

type OrdersClientRepository = Pick<OrdersRepository, 'createOrder'>

export const ordersClientRepository: OrdersClientRepository = {
  createOrder: (body: Order) => http.post(baseApi, '/orders', body)
}