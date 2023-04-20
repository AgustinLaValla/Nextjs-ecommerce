import { testApiHandler } from 'next-test-api-route-handler';
import productsApi from '@/pages/api/products';
import productApi from '@/pages/api/products/[slug]';
import { resetDB } from '../utils/utils';
import { mockData } from '../mocks/mocks';


const handler: typeof productsApi = productsApi;

describe('Procuts Api', () => {
  test('it should call GET endopoint to get a productList', async () => {
    await testApiHandler({
      handler: (_, res) => res.status(200).json(mockData.products),
      test: async ({ fetch }) => {
        await resetDB();
        const res = await fetch({ method: 'GET' });
        expect(res.json()).resolves.toStrictEqual(mockData.products);
      }
    });
  });
})