import { Product as ProductModel } from '@/domain/models';
import { Schema, Document, model, Model, models } from 'mongoose';


export interface IProduct extends Document, Omit<ProductModel, '_id'> { }

const productSchema = new Schema<IProduct>({
  description: { type: String, required: true, default: '' },
  images: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  sizes: [{
    type: String,
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      message: '{VALUE} is not a valid size'
    }
  }],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true, default: '' },
  type: {
    type: String,
    enum: {
      values: ['shirts', 'pants', 'hoodies', 'hats'],
      message: '{VALUE} no es un tipo válido'
    },
    default: 'shirts'
  },
  gender: {
    type: String,
    enum: {
      values: ['men', 'women', 'kid', 'unisex'],
      message: '{VALUE} no es un genero válido'
    },
    default: 'women'
  }
}, {
  timestamps: true
});

export const Product = (models.Product || model('Product', productSchema)) as Model<IProduct>