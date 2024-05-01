import { Prisma, User } from "@prisma/client";
import Repository from "./repository.interface";

export interface UsersRepositoryInterface extends Repository<User> {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
