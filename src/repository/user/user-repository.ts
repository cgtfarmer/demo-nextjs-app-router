import { User } from '@/model/user';

export interface UserRepository {
  findAll(): Promise<User[]>;

  findById(id: number): Promise<User>;

  create(user: User): Promise<User>;

  update(user: User): Promise<User>;

  destroy(id: number): void;
};

