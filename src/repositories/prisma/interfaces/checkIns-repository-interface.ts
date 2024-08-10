import { CheckIn, Prisma } from "@prisma/client";

export interface CheckinRepositoryInterface {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findCheckinByUserIdAndDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null>;
}
