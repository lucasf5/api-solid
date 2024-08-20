import { MakeGymService } from "@/services/@factories/make-gym-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const CreateGymController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const schema = z.object({
      title: z.string(),
      description: z.string().optional(),
      phone: z.string().optional(),
      latitude: z.number(),
      longitude: z.number(),
    });

    const { title, description, phone, latitude, longitude } = schema.parse(
      request.body
    );

    const { getGymService } = MakeGymService();

    const gym = await getGymService.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    reply.status(201).send(gym);
  } catch (error) {
    reply.status(500).send({ error: error });
  }
};
