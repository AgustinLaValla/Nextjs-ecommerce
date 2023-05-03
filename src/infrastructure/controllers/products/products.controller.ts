import { NextApiRequest, NextApiResponse } from "next";
import { BaseProduct, ErrorWidthCode, Product as ProductModel } from "@/domain/models";
import { productsServerService } from "@/domain/services";
import { Product } from "@/infrastructure/database/schemas";
import { productsRepository } from "@/infrastructure/repositories";
import { throw500Error } from "@/infrastructure/controllers/utils";
import { parseHttpBody } from "@/infrastructure/utils/utils";

const productsService = productsServerService(productsRepository(Product));

export const getProductsByGender = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gender = 'all' } = req.query as { gender: string };
  try {
    const products = await productsService.getProductsByGender(gender);
    return res.status(200).json(products);
  } catch (error) {
    return throw500Error(res);
  }
};

export const getSortedProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await productsService.getSortedProducts();
    return res.status(200).json(products);
  } catch (error) {
    return error instanceof ErrorWidthCode
      ? res.status(error.code).json(error.message)
      : throw500Error(res);
  }
}

export const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };
  try {
    const product = await productsService.getProductBySlug(slug);
    return res.status(200).json(product);
  } catch (error) {
    if (error instanceof ErrorWidthCode)
      return res.status(error.code).json(error.message);
    return throw500Error(res);
  }
};

export const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  let body = parseHttpBody(req.body);
  const { product } = body as { product: BaseProduct };
  try {
    const newProduct = await productsService.createProduct(product);
    return res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof ErrorWidthCode)
      return res.status(error.code).json(error.message);
    return throw500Error(res);
  }
};

export const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  let body = parseHttpBody(req.body);

  if (!body) return res.status(400).json({ message: 'A product should be provided' });

  const { product } = body as { product: Partial<ProductModel> };
  try {
    const updatedProduct = await productsService.updateProduct(product);
    return res.status(201).json(updatedProduct);
  } catch (error) {
    if (error instanceof ErrorWidthCode)
      return res.status(error.code).json(error.message);
    return throw500Error(res);
  }
}

export const searchProductByTerm = async (req: NextApiRequest, res: NextApiResponse) => {
  let { search = '' } = req.query as { search: string };

  if (!search) return res.status(400).json({ message: 'Should specify search query' });

  search = search.toLowerCase();

  try {
    const products = await productsService.getProductsByTerm(search);
    return res.status(200).json(products);
  } catch (error) {
    if (error instanceof ErrorWidthCode)
      return res.status(error.code).json(error.message);
    return throw500Error(res);
  }
}