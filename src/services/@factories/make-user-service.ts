import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUsersProfileService } from "../Get-Users/get-users-profile";

export const makeUserFactorie = () => {
  const usersRepository = new PrismaUsersRepository();
  const getUsersProfileService = new GetUsersProfileService(usersRepository);

  return { getUsersProfileService };
};
