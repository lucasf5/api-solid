import { makeUserService } from "@/services/@factories/make-user-service";
import { FastifyReply, FastifyRequest } from "fastify";

export const ProfileController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = req.user as { userId: string };
  const { getUserProfileService } = makeUserService();

  const profile = await getUserProfileService.execute({ userId });

  reply.status(200).send(profile);
};
