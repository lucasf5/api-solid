import { UsersRepositoryInterface } from "@/repositories/prisma/users-repository-interface";
import CustomError from "../@errors/CustomError";
import { User } from "@prisma/client";

interface GetUserProfileServiceRequest {
  userId: string;
}

interface GetUserProfileServiceResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return {
      user,
    };
  }
}
