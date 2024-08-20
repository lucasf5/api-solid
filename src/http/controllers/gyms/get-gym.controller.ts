import { makeSearchGymService } from "@/services/@factories/make-search-gym-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const GetGymController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const schema = z.object({
      title: z.string(),
      page: z.coerce.number().min(1).default(1),
    });

    const { title, page } = schema.parse(request.query);

    const { searchGymService } = makeSearchGymService();

    const gyms = await searchGymService.execute({
      title,
      page,
    });

    reply.status(200).send(gyms);
  } catch (error) {
    reply.status(500).send({ error: error });
  }
};
