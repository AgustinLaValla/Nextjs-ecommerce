import { Model } from "mongoose";
import { IOrder, IProduct } from '@/infrastructure/database/schemas';
import { OrdersRepository } from "@/domain/services";
import { db } from "@/infrastructure/database";
import { ErrorWidthCode } from "@/domain/models";
import { config } from "@/config/config";

export const ordersServerRepository = (

  orderModel: Model<IOrder>,
  productModel: Model<IProduct>,

): OrdersRepository => ({

  createOrder: async (order, userId: string) => {

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
  }
});