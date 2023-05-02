import { UserRepository } from '@/domain/services'

export const userService = (userRepository: UserRepository) => ({
  register: (email: string, name: string) => userRepository.register(email, name),
  countClientUsers: () => userRepository.countClientUsers()
});