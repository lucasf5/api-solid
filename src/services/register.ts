import { UsersRepositoryInterface } from "@/repositories/users-repository-interface";
import { hash } from "bcryptjs";
import CustomError from "./errors/CustomError";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 4);

    const existingSameEmail = await this.usersRepository.findByEmail(email);

    if (existingSameEmail) {
      throw new CustomError("Email already in use", 409);
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return user;
  }
}
