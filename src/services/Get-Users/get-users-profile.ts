import { UsersRepositoryInterface } from "@/repositories/prisma/interfaces/users-repository-interface";
import { User } from "@prisma/client";

interface GetUsersProfileServiceResponse {
  users: User[];
}

class GetUsersProfileService {
  constructor(private usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }
  async execute(): Promise<GetUsersProfileServiceResponse> {
    const users = await this.usersRepository.getAllUsers();
    return {
      users,
    };
  }
}

export { GetUsersProfileService };
