import { Product } from "@/domain/models";
import { ProductsRepository } from "@/domain/services";

export const productsServerService = (productsRepository: ProductsRepository) => ({
  getProductsByGender: (gender?: string) => productsRepository.getProductsByGender(gender),
  getProductBySlug: (slug: string) => productsRepository.getProductBySlug(slug),
  getAllProductSlugs: () => productsRepository.getAllProductSlugs(),
  getProductsByTerm: (term: string) => productsRepository.getProductsByTerm(term),
  getAllProducts: () => productsRepository.getAllProducts(),
  createManyProducts: (products: Omit<Product, 'createdAt' | 'updatedAt' | '_id'>[]) => productsRepository.createManyProducts(products),
  deleteManyProducts: () => productsRepository.deleteManyProducts()
});

export const productsClientService = (productsRepository: Pick<ProductsRepository, 'getProductsByGender' | 'getProductBySlug'>) => ({
  getProductsByGender: (gender?: string) => productsRepository.getProductsByGender(gender),
  getProductBySlug: (slug?: string) => productsRepository.getProductBySlug(slug)
});