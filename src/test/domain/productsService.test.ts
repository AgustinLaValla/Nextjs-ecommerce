import { productsServerService } from '@/domain/services';
import { ProductsRepository } from '@/domain/services';
import { mockData } from '../mocks/mocks';

describe('Products Service', () => {

  let service: ReturnType<typeof productsServerService>;
  let repository: ProductsRepository

  beforeAll(() => {
    repository = {
      getProductsByGender: jest.fn(),
      getProductBySlug: jest.fn(),
      getAllProductSlugs: jest.fn(),
      getProductsByTerm: jest.fn(),
      getAllProducts: jest.fn(),
    }

    service = productsServerService(repository);
  });

  beforeEach(() => {
    jest.clearAllMocks()
  });



  test('Get Products By Gender', async () => {
    const gender = 'men';
    (repository.getProductsByGender as jest.Mock).mockResolvedValue(mockData.products);
    const products = await service.getProductsByGender(gender);

    expect(repository.getProductsByGender).toHaveBeenCalledWith(gender);
    expect(products).toHaveLength(3);
    expect(products).toEqual(mockData.products);
  });

  test('Get Product Slugs', async () => {
    const slug = 'mens_chill_crew_neck_sweatshirt';
    (repository.getProductBySlug as jest.Mock).mockResolvedValue(mockData.products[0]);
    const product = await service.getProductBySlug(slug);

    expect(repository.getProductBySlug).toHaveBeenCalledWith(slug);
    expect(product).toEqual(mockData.products[0]);
  });

  test('Get All Products By Slug', async () => {
    const slugList = mockData.products.map(({ slug }) => ({ slug }));

    (repository.getAllProductSlugs as jest.Mock).mockResolvedValue(slugList);
    const slugs = await service.getAllProductSlugs();

    expect(repository.getAllProductSlugs).toHaveBeenCalled();
    expect(slugs[0]).toEqual(expect.objectContaining({ slug: 'mens_chill_crew_neck_sweatshirt' }));
    expect(slugs).toEqual(slugList);
  });
});
