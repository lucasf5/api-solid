import { MakeValidateCheckInService } from "@/services/@factories/make-validate-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const validateCheckinController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { validateCheckInService } = MakeValidateCheckInService();

    const schema = z.object({
      id: z.string(),
    });

    const { id } = schema.parse(request.params);

    await validateCheckInService.execute({ checkInId: id });

    reply.status(200).send({ message: "Checkin validated" });
  } catch (error) {
    reply.status(500).send({ error: "Could not validate checkin" });
  }
};
