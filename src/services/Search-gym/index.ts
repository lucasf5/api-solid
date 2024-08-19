import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { Gyn } from "@prisma/client";

interface GetGymRequest {
  name: string;
}

interface GetGymResponse {
  gyms: Gyn[];
}

export class GetGymService {
  constructor(private readonly gymRepository: GymsRepository) {}

  async execute({ name }: GetGymRequest): Promise<GetGymResponse> {
    const gym = await this.gymRepository.searchMany(name);

    return { gyms: gym };
  }
}
