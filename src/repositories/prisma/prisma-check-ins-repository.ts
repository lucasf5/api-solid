import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckinRepositoryInterface } from "./interfaces/checkIns-repository-interface";

export class CheckinsRepository implements CheckinRepositoryInterface {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
  async findCheckinByUserIdAndDate(userId: string, date: Date): Promise<any> {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
    });

    return checkIn;
  }
}
