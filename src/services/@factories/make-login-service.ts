import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { LoginService } from "../Login/login";

export const makeAuthenticateService = () => {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new LoginService(usersRepository);

  return { authenticateService };
};
