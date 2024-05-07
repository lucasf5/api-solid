import { UsersRepositoryInterface } from "@/repositories/prisma/users-repository-interface";
import CustomError from "../@errors/CustomError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { env } from "@/env";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Email or password incorrect", 401);
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new CustomError("Email or password incorrect", 401);
    }

    const token = sign({}, env.JWT_SECRET, {
      subject: user.email,
      expiresIn: "1d",
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
