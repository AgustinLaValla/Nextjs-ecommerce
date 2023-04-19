import { Model } from 'mongoose';
import { db } from "@/infrastructure/database";
import { IProduct } from "@/infrastructure/database/schemas";
import { SHOP_CONSTANTS } from '@/infrastructure/database/constants';
import { ProductsRepository } from '@/domain/services';
import { config } from '@/config/config';
import { ErrorWidthCode } from '@/domain/models';
// import { MongoDocument } from "@/infrastructure/database/common";

// type ProductDocument = MongoDocument<IProduct>

const setImageUrl = (img: string) => img.includes('http') ? img : `${config.hostName}/products/${img}`;

export const productsRepository = (productModel: Model<IProduct>): ProductsRepository => ({
  getProductsByGender: async (gender = 'all') => {

    let condition = {};

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
      condition = { gender };
    }

    await db.connect();
    const products = await productModel
      .find(condition)
      .select('title images price inStock slug -_id')
      .lean()

    await db.disconnect();

    return products
  },

  getProductBySlug: async (slug?: string) => {
    await db.connect();

    if (!slug) throw new ErrorWidthCode(400, 'Slug must be provided');

    const product = await productModel.findOne({ slug }).lean();

    await db.disconnect();

    if (!product) throw new ErrorWidthCode(400, 'No produc found');

    product.images = product.images.map(img => setImageUrl(img));

    return product;
  },

  getAllProductSlugs: async () => {
    await db.connect();
    const slugs = await productModel.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
  },

  getProductsByTerm: async (term: string) => {
    term = term.toString().toLowerCase();

    await db.connect();
    const products = await productModel.find({
      $text: { $search: term }
    })
      .select('title images price inStock slug -_id')
      .lean();

    await db.disconnect();

    return products.map(product => ({
      ...product,
      images: product.images.map(image => setImageUrl(image))
    }));
  },

  getAllProducts: async () => {
    await db.connect();
    const products = await productModel.find().lean();
    await db.disconnect();

    const updatedProducts = products.map(product => ({
      ...product,
      images: product.images.map(image => setImageUrl(image))
    }));

    return JSON.parse(JSON.stringify(updatedProducts))

  }
});