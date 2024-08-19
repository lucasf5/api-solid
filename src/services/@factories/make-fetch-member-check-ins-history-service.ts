import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchMemberCheckInsHistoryService } from "../Fetch-member-check-ins-history";

export const makeFetchMemberCheckInsHistoryService = () => {
  const checkinsRepository = new CheckinsRepository();
  const fetchMemberCheckInsHistoryService =
    new FetchMemberCheckInsHistoryService(checkinsRepository);
  return { fetchMemberCheckInsHistoryService };
};
