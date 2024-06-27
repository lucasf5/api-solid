import { CheckIn, Prisma } from "@prisma/client";
import { CheckinRepositoryInterface } from "../prisma/interfaces/checkIns-repository-interface";
import { randomUUID } from "crypto";

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
}

export { InMemoryCheckinsRepository };
