import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../Authenticate/authenticate";

export const makeAuthenticateService = () => {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return { authenticateService };
};
