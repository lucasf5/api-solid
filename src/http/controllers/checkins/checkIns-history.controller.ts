import { makeFetchMemberCheckInsHistoryService } from "@/services/@factories/make-fetch-member-check-ins-history-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const { fetchMemberCheckInsHistoryService } =
    makeFetchMemberCheckInsHistoryService();

  const { checkIns } = await fetchMemberCheckInsHistoryService.execute({
    userId: (request.user as { userId: string }).userId,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
