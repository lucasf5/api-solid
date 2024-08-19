import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUsersProfileService } from "../Get-users/get-users-profile";

export const MakeGetUsersService = () => {
  const usersRepository = new PrismaUsersRepository();
  const getUsersProfileService = new GetUsersProfileService(usersRepository);

  return { getUsersProfileService };
};
