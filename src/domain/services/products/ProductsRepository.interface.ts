import { BaseProduct, Product } from "@/domain/models";

export interface ProductsRepository {
  getProductsByGender: (gender?: string) => Promise<Product[]>
  getProductBySlug: (slug?: string) => Promise<Product | null>
  getAllProductSlugs: () => Promise<{ slug: string }[]>
  getProductsByTerm: (term: string) => Promise<Product[]>
  getAllProducts: () => Promise<Product[]>
  createProduct: (product: BaseProduct) => Promise<Product>
  createManyProducts: (products: BaseProduct[]) => Promise<Product[]>
  deleteManyProducts: () => Promise<void>
}