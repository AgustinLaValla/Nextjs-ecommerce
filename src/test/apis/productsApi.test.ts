import { testApiHandler } from 'next-test-api-route-handler';
import { Types } from 'mongoose';
import productsApi from '@/pages/api/products';
import productApi from '@/pages/api/products/[slug]';
import { resetDB } from '../utils/utils';
import { mockData } from '../mocks/mocks';
import { setImageUrl } from '@/infrastructure/repositories/productsServer.Repository';


const handler: typeof productsApi = productsApi;
const productApiHandler: typeof productApi = productApi;

describe('Procuts Api', () => {
  test('it should call GET endopoint to get a productList', async () => {
    await resetDB();
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        expect(res.json()).resolves.toStrictEqual(mockData.products);
      }
    });
  });

  test('it should call GET endpoint to a product by slug', async () => {
    await resetDB();
    const product = {
      ...mockData.products[0],
      images: mockData.products[0].images.map(img => setImageUrl(img))
    };
    const slug = product.slug;

    await testApiHandler({
      handler: productApiHandler,
      params: { slug },
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET', query: { slug } });
        expect(res.json()).resolves.toStrictEqual(product);
      }
    });
  });

  test('it should call POST endpoint to create a new product', async () => {

    const product = {
      inStock: 3,
      price: 100,
      sizes: ["XS", "S", "M", "L"],
      slug: "camisa_herencia",
      type: "shirts",
      tags: ["sweatshirt"],
      title: "Camisa Herencia",
      gender: "men",
      description: "Camisa Herencia. Temporada invierno",
      images: [
        "1740176-00-A_0_2000.jpg",
        "1740176-00-A_1.jpg"
      ],
      _id: "644155580ebda2d6eea59e3a",
      __v: 0,
      createdAt: "2023-04-20T14:20:12.702Z",
      updatedAt: "2023-04-20T14:20:12.702Z"
    }

    await resetDB();

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const resp = await fetch({ method: 'POST', body: JSON.stringify({ product }) });
        // expect(resp.json()).resolves.toStrictEqual(body.product)
      }
    })
  })
});