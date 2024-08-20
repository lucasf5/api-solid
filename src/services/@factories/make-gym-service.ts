import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { GymService } from "../Gym/gym";

export const MakeGymService = () => {
  const gymRepository = new GymsRepository();
  const getGymService = new GymService(gymRepository);

  return { getGymService };
};
