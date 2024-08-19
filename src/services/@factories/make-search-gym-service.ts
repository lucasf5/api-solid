import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGynService } from "../Search-gym";

export const makeSearchGymService = () => {
  const gymsRepository = new GymsRepository();
  const searchGymService = new SearchGynService(gymsRepository);

  return { searchGymService };
};
