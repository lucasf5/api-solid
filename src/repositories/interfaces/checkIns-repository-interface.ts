import { CheckIn, Prisma } from "@prisma/client";

export interface CheckinRepositoryInterface {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findCheckinByUserIdAndDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null>;
  findCheckinsByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countCheckinsByUserId(userId: string): Promise<number>;
  findCheckinById(checkInId: string): Promise<CheckIn | null>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
