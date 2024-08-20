import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { Gyn } from "@prisma/client";

interface GetGymRequest {
  title: string;
  page: number;
}

interface GetGymResponse {
  gyms: Gyn[];
}

export class SearchGynService {
  constructor(private readonly gymRepository: GymsRepository) {}

  async execute({ title, page }: GetGymRequest): Promise<GetGymResponse> {
    const gym = await this.gymRepository.searchMany(title, page);

    return { gyms: gym };
  }
}
