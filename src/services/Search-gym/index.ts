import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { Gyn } from "@prisma/client";

interface GetGymRequest {
  name: string;
  page: number;
}

interface GetGymResponse {
  gyms: Gyn[];
}

export class SearchGynService {
  constructor(private readonly gymRepository: GymsRepository) {}

  async execute({ name, page }: GetGymRequest): Promise<GetGymResponse> {
    const gym = await this.gymRepository.searchMany(name, page);

    return { gyms: gym };
  }
}
