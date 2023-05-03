import { Model, isValidObjectId } from 'mongoose';
import { db } from "@/infrastructure/database";
import { IProduct } from "@/infrastructure/database/schemas";
import { SHOP_CONSTANTS } from '@/infrastructure/database/constants';
import { ProductsRepository } from '@/domain/services';
import { config } from '@/config/config';
import { BaseProduct, ErrorWidthCode, Product } from '@/domain/models';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

export const setImageUrl = (img: string) => img.includes('http') ? img : `${config.hostName}/products/${img}`;

export const productsRepository = (productModel: Model<IProduct>): ProductsRepository => ({
  getProductsByGender: async (gender = 'all') => {

    let condition = {};

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
      condition = { gender };
    }

    await db.connect();
    const products = await productModel
      .find(condition)
      // .select('title images price inStock slug -_id')
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
  },

  getSortedProducts: async () => {
    await db.connect();

    const products = await productModel.find()
      .sort({ title: 'asc' })
      .lean();

    await db.disconnect();

    const updatedProducts = products.map(product => ({
      ...product,
      images: product.images.map(image => setImageUrl(image))
    }));

    return JSON.parse(JSON.stringify(updatedProducts))
  },

  createProduct: async (product: BaseProduct) => {

    const { images = [], slug } = product;

    if (images.length < 2) throw new ErrorWidthCode(400, 'At least two images are required');

    await db.connect();

    const exist = await productModel.findOne({ slug });
    if (exist) throw new ErrorWidthCode(400, 'Slug already exist. Please provide a unique slug');

    const newProduct = new productModel(product);
    await newProduct.save();

    await db.disconnect();

    return newProduct;
  },

  createManyProducts: async (products: BaseProduct[]) => {
    await db.connect();
    const insertedProducts = await productModel.insertMany(products);
    await db.disconnect();
    return insertedProducts;
  },

  updateProduct: async (product: Partial<Product>) => {

    const { _id, images = [] } = product;

    if (!isValidObjectId(_id)) throw new ErrorWidthCode(400, 'Invalid ID');
    if (images.length < 2) throw new ErrorWidthCode(400, 'At least two images are required');

    await db.connect();
    const currentProduct = await productModel.findById(_id);
    if (!currentProduct) throw new ErrorWidthCode(402, 'No product found');

    currentProduct.images.forEach(async img => {
      if (!images.includes(img)) {
        const [fileId, extension] = img.substring(img.lastIndexOf('/') + 1).split('.');
        await cloudinary.uploader.destroy(fileId);
      }
    })

    const updatedProduct = await productModel.findByIdAndUpdate(_id, product, { new: true });

    await db.disconnect();
    return updatedProduct as Product;
  },

  deleteManyProducts: async () => {
    await db.connect();
    await productModel.deleteMany();
    await db.connect();
  },

  countProducts: async () => {
    await db.connect();
    const qty = await productModel.count();
    await db.disconnect();
    return qty;
  },

  countProductsByStock: async (stock: number) => {
    await db.connect();
    const qty = await productModel.find({ inStock: stock }).count();
    await db.disconnect();
    return qty;
  },

  countProductsByStockLessThan: async () => {
    await db.connect();
    const qty = await productModel.find({ inStock: { $lte: 10 } }).count()
    await db.disconnect();
    return qty;
  }
});