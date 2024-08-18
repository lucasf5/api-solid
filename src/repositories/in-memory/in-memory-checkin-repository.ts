import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { CheckinRepositoryInterface } from "../prisma/interfaces/checkIns-repository-interface";

class InMemoryCheckinsRepository implements CheckinRepositoryInterface {
  private checkins: CheckIn[] = [];

  constructor() {
    this.checkins = [];
  }
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin = {
      id: randomUUID(),
      gyn_id: data.gyn_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.checkins.push(checkin);

    return Promise.resolve(checkin);
  }

  findCheckinByUserIdAndDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const checkin = this.checkins.find(
      (checkin) =>
        checkin.user_id === userId &&
        checkin.created_at.getDate() === date.getDate()
    );

    return Promise.resolve(checkin || null);
  }

  findCheckinsByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkins = this.checkins
      .filter((checkin) => checkin.user_id === userId)
      .slice((page - 1) * 20, page * 20);
    return Promise.resolve(checkins);
  }

  countCheckinsByUserId(userId: string): Promise<number> {
    const checkins = this.checkins.filter(
      (checkin) => checkin.user_id === userId
    );
    return Promise.resolve(checkins.length);
  }
}

export { InMemoryCheckinsRepository };
