import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileService } from "../Get-user/get-user-profile";

export const makeUserService = () => {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileService = new GetUserProfileService(usersRepository);

  return { getUserProfileService };
};
