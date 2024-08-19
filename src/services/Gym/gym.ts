import { GymsRepositoryInterface } from "@/repositories/interfaces/gyms-repository-interface";
import { Gyn } from "@prisma/client";

interface GymServiceRequest {
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number;
  longitude: number;
}

interface GymServiceResponse {
  Gym: Gyn;
}

export class GymService {
  constructor(private gymsRepository: GymsRepositoryInterface) {
    this.gymsRepository = gymsRepository;
  }

  async execute({
    title,
    latitude,
    longitude,
  }: GymServiceRequest): Promise<GymServiceResponse> {
    const gym = await this.gymsRepository.create({
      title: title,
      latitude: latitude,
      longitude: longitude,
    });

    return { Gym: gym };
  }
}
