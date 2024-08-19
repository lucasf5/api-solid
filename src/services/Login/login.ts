import { UsersRepositoryInterface } from "@/repositories/interfaces/users-repository-interface";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import CustomError from "../@errors/CustomError";

interface LoginServiceRequest {
  email: string;
  password: string;
}

interface LoginServiceResponse {
  user: User;
}

export class LoginService {
  constructor(private usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  async execute({
    email,
    password,
  }: LoginServiceRequest): Promise<LoginServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Email or password incorrect", 401);
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new CustomError("Email or password incorrect", 401);
    }

    return { user };
  }
}
