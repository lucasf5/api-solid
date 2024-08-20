import { makeFetchNearbyGymsService } from "@/services/@factories/make-fetch-nearby-gyms-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const GetNearbyGymController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const schema = z.object({
      latitude: z.coerce.number(),
      longitude: z.coerce.number(),
    });

    const { latitude, longitude } = schema.parse(request.query);

    const { fetchNearbyGymsService } = makeFetchNearbyGymsService();

    const gyms = await fetchNearbyGymsService.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    });

    reply.status(200).send(gyms);
  } catch (error) {
    reply.status(500).send({ error: error });
  }
};
