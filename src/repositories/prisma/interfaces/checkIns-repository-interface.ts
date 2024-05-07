import { CheckIn, Prisma } from "@prisma/client";
import Repository from "./repository.interface";

export interface CheckinRepositoryInterface extends Repository<CheckIn> {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findCheckinByUserIdAndDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null>;
}
