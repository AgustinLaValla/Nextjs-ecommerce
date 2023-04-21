import { User } from "@/domain/models";

export interface UserRepository {
  register: (email: string, name: string) => Promise<User>
}