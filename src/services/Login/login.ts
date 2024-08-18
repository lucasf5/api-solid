import { UsersRepositoryInterface } from "@/repositories/prisma/interfaces/users-repository-interface";
import { compare } from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import CustomError from "../@errors/CustomError";
dotenv.config();

interface LoginServiceRequest {
  email: string;
  password: string;
}

interface LoginServiceResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "1h",
    });

    return { user, token };
  }
}
