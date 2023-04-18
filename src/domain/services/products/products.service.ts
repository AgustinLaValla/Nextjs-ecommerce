import { ProductsRepository } from "./ProductsRepository.interface";

export const productsServerService = (productsRepository: ProductsRepository) => ({
  getProductsByGender: (gender?: string) => productsRepository.getProductsByGender(gender),
  getProductBySlug: (slug: string) => productsRepository.getProductBySlug(slug),
  getAllProductSlugs: () => productsRepository.getAllProductSlugs(),
  getProductsByTerm: (term: string) => productsRepository.getProductsByTerm(term),
  getAllProducts: () => productsRepository.getAllProducts()
});

export const productsClientService = (productsRepository: Pick<ProductsRepository, 'getProductsByGender' | 'getProductBySlug'>) => ({
  getProductsByGender: (gender?: string) => productsRepository.getProductsByGender(gender),
  getProductBySlug: (slug?: string) => productsRepository.getProductBySlug(slug)
});