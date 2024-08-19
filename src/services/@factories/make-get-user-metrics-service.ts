import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsService } from "../Get-user-metrics";

export const MakeGetUserMetricsService = () => {
  const checkinRepository = new CheckinsRepository();
  const getUserMetricsService = new GetUserMetricsService(checkinRepository);

  return { getUserMetricsService };
};
