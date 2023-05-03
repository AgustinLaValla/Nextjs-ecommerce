import { BaseProduct, Product } from "@/domain/models";
import { ProductsRepository } from "@/domain/services";

export const productsServerService = (productsRepository: ProductsRepository) => ({
  getProductsByGender: (gender?: string) => productsRepository.getProductsByGender(gender),
  getProductBySlug: (slug: string) => productsRepository.getProductBySlug(slug),
  getAllProductSlugs: () => productsRepository.getAllProductSlugs(),
  getProductsByTerm: (term: string) => productsRepository.getProductsByTerm(term),
  getAllProducts: () => productsRepository.getAllProducts(),
  createProduct: (product: BaseProduct) => productsRepository.createProduct(product),
  createManyProducts: (products: BaseProduct[]) => productsRepository.createManyProducts(products),
  deleteManyProducts: () => productsRepository.deleteManyProducts(),
  countProducts: () => productsRepository.countProducts(),
  countProductsByStock: (stock: number) => productsRepository.countProductsByStock(stock),
  countProductsByStockLessThan: (stock: number) => productsRepository.countProductsByStockLessThan(stock),
  getSortedProducts: () => productsRepository.getSortedProducts(),
  updateProduct: (product: Partial<Product>) => productsRepository.updateProduct(product)
});

export const productsClientService = (productsRepository: Pick<ProductsRepository, 'getProductsByGender' | 'getProductBySlug'>) => ({
  getProductsByGender: (gender?: string) => productsRepository.getProductsByGender(gender),
  getProductBySlug: (slug?: string) => productsRepository.getProductBySlug(slug)
});