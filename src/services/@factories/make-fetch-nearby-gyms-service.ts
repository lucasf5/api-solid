import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchnearbyGymsService } from "../Fetch-nearby-gyms";

export const makeFetchNearbyGymsService = () => {
  const gymsRepository = new GymsRepository();
  const fetchNearbyGymsService = new FetchnearbyGymsService(gymsRepository);
  return { fetchNearbyGymsService };
};
