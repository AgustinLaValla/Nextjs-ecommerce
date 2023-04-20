import { Product } from "@/domain/models";

export interface ProductsRepository {
  getProductsByGender: (gender?: string) => Promise<Product[]>
  getProductBySlug: (slug?: string) => Promise<Product | null>
  getAllProductSlugs: () => Promise<{ slug: string }[]>
  getProductsByTerm: (term: string) => Promise<Product[]>
  getAllProducts: () => Promise<Product[]>
  createManyProducts: (products: Omit<Product, 'createdAt' | 'updatedAt' | '_id'>[]) => Promise<Product[]>
  deleteManyProducts: () => Promise<void>
}