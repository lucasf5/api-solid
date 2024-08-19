import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

interface GetUserMetricsRequest {
  userId: string;
}

interface GetUserMetricsResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private readonly checkinRepository: CheckinsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkIns = await this.checkinRepository.countCheckinsByUserId(userId);

    return {
      checkInsCount: checkIns,
    };
  }
}
