import { UserRepository, userService } from '@/domain/services';
import { mockData } from '../mocks/mocks';


let repository: UserRepository = { register: jest.fn() };
let service = userService(repository);


describe('User Service', () => {
  beforeEach(() => jest.resetAllMocks());

  test('Should register a user and return the user data', async () => {

    (repository.register as jest.Mock).mockResolvedValue(mockData.users);

    const user = await service.register('test@test.com', 'Test');

    expect(repository.register).toHaveBeenCalledWith('test@test.com', 'Test');
    expect(user).toEqual(mockData.users)

  })
})