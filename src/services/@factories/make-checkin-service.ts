import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckinService } from "../Checkin/checkin";

export const MakeCheckinService = () => {
  const checkinRepository = new CheckinsRepository();
  const gymsRepository = new GymsRepository();
  const checkinService = new CheckinService(checkinRepository, gymsRepository);
  return { checkinService };
};
