import { makeUserService } from "@/services/@factories/make-user-service";
import { FastifyReply, FastifyRequest } from "fastify";

export const ProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = request.user as { userId: string };
  const { getUserProfileService } = makeUserService();

  const profile = await getUserProfileService.execute({ userId });

  reply.status(200).send(profile);
};
