import { NextApiRequest, NextApiResponse } from "next";
import { productsServerService } from "@/domain/services";
import { Product } from "@/infrastructure/database/schemas";
import { productsRepository } from "@/infrastructure/repositories";
import { seedData } from "./seedData";

const service = productsServerService(productsRepository(Product));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: "Forbidden: You don't have access this API" });
  }

  const { products } = seedData;

  await service.deleteManyProducts();
  await service.createManyProducts(products);

  return res.status(201).json({ message: 'DB Populated' })
}