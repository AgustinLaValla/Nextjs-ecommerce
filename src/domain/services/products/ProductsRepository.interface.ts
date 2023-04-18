import { Product } from "@/domain/models";

export interface ProductsRepository {
  getProductsByGender: (gender?: string) => Promise<Product[]>
  getProductBySlug: (slug?: string) => Promise<Product | null>
  getAllProductSlugs: () => Promise<Product[]>
  getProductsByTerm: (term: string) => Promise<Product[]>
  getAllProducts: () => Promise<Product[]>
}