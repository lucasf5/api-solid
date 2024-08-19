import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckinRepositoryInterface } from "../interfaces/checkIns-repository-interface";

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
          // greater then or equal to 00:00:00.000
          gte: new Date(date.setHours(0, 0, 0, 0)),
          // less then to 23:59:59.999
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
    });

    return checkIn;
  }

  async findCheckinsByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }
  countCheckinsByUserId(userId: string): Promise<number> {
    const checkins = prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return checkins;
  }

  async findCheckinById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });

    return checkIn;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return updatedCheckIn;
  }
}
