import { productsServerService } from '@/domain/services';
import { productsRepository } from '@/infrastructure/repositories';
import { Product } from '@/infrastructure/database/schemas';
import { mockData } from '../mocks/mocks';

const service = productsServerService(productsRepository(Product));

export const resetDB = async () => {
  await service.deleteManyProducts();
  await service.createManyProducts(mockData.products);
}