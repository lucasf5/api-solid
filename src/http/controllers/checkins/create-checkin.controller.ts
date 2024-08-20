import { MakeCheckinService } from "@/services/@factories/make-checkin-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createCheckinController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { checkinService } = MakeCheckinService();

    const schema = z.object({
      gymId: z.string(),
      userLatitude: z.number(),
      userLongitude: z.number(),
    });

    const { gymId, userLatitude, userLongitude } = schema.parse(request.body);

    const userId = (request.user as { userId: string }).userId;

    const checkin = await checkinService.execute({
      userId,
      gymId,
      userLatitude,
      userLongitude,
    });

    reply.status(201).send(checkin);
  } catch (error) {
    reply.status(500).send({ error: error });
  }
};
