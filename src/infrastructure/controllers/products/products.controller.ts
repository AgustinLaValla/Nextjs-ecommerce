import { NextApiRequest, NextApiResponse } from "next";
import { ErrorWidthCode } from "@/domain/models";
import { productsServerService } from "@/domain/services/products/products.service";
import { Product } from "@/infrastructure/database/schemas";
import { productsRepository } from "@/infrastructure/repositories/productsServer.Repository";
import { throw500Error } from "@/infrastructure/controllers/utils";

const productsService = productsServerService(productsRepository(Product));

export const getProductsByGender = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gender = 'all' } = req.query as { gender: string };
  try {
    const products = await productsService.getProductsByGender(gender);
    return res.status(200).json(products);
  } catch (error) {
    return throw500Error(res);
  }
}

export const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };
  try {
    await productsService.getProductBySlug(slug);
  } catch (error) {
    if (error instanceof ErrorWidthCode)
      return res.status(error.code).json(error.message);

    return throw500Error(res);
  }
}