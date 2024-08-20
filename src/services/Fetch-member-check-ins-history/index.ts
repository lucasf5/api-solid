import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { Prisma } from "@prisma/client";

interface FetchMemberCheckInsHistoryServiceRequest {
  userId: string;
  page: number;
}

interface FetchMemberCheckInsHistoryServiceResponse {
  checkIns: Prisma.CheckInUncheckedCreateInput[];
}

export class FetchMemberCheckInsHistoryService {
  constructor(private readonly checkinRepository: CheckinsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsHistoryServiceRequest): Promise<FetchMemberCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkinRepository.findCheckinsByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
