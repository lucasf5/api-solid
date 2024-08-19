import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { Gyn } from "@prisma/client";

interface FetchnearbyGymsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchnearbyGymsServiceResponse {
  gyms: Gyn[];
}

export class FetchnearbyGymsService {
  constructor(private readonly gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchnearbyGymsServiceRequest): Promise<FetchnearbyGymsServiceResponse> {
    const gyms = await this.gymRepository.nearbyGyms({
      userLatitude,
      userLongitude,
    });

    return { gyms };
  }
}
