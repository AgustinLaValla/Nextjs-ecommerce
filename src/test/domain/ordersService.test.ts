import { OrdersRepository, ordersServeService } from "@/domain/services";
import { baseOrderMock, mockData } from "../mocks/mocks";

describe('Order Service', () => {

  let service: ReturnType<typeof ordersServeService>;
  let repository: OrdersRepository;

  beforeAll(() => {
    repository = {
      createOrder: jest.fn(),
      getOrders: jest.fn()
    };

    service = ordersServeService(repository);

  });

  beforeEach(() => jest.resetAllMocks());

  test('It should create an order an return the created order', async () => {

    (repository.createOrder as jest.Mock).mockResolvedValue(mockData.orders[0]);

    const order = await service.createOrder(baseOrderMock);
    expect(repository.createOrder).toHaveBeenCalledWith(baseOrderMock);
    expect(order).toEqual(mockData.orders[0]);

  });

  test('It should retrieve all the orders', async () => {

    (repository.getOrders as jest.Mock).mockResolvedValue(mockData.orders);

    const orders = await service.getOrders();

    expect(repository.getOrders).toHaveBeenCalled();
    expect(orders).toEqual(mockData.orders);
  })

});