import { Schema, Document, models, model, Model } from 'mongoose';
import { Order as OrderModel } from '@/domain/models';

export interface IOrder extends Document, Omit<OrderModel, '_id'> { }

const orderSchema = new Schema<OrderModel>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  }],
  shippingAddress: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  }],


  numberOfItems: { type: Number, required: true },
  subTotal     : { type: Number, required: true },
  tax          : { type: Number, required: true },
  total        : { type: Number, required: true },

  isPaid : { type: Boolean, required: true, default: false },
  paidAt : { type: String },

  transactionId: { type: String },
}, {
  timestamps: true
});

export const Order = (models.Order || model('Order', orderSchema)) as Model<IOrder>;