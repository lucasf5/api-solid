import { Prisma, User } from "@prisma/client";
import { UsersRepositoryInterface } from "../prisma/interfaces/users-repository-interface";

class InMemoryUsersRepository implements UsersRepositoryInterface {
  private users: User[] = [];

  constructor() {
    this.users = [];
  }
  create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: "any_id",
      email: data.email,
      name: data.name as string,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return Promise.resolve(user);
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return Promise.resolve(user || null);
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return Promise.resolve(user || null);
  }
}

export { InMemoryUsersRepository };
