import { makeUserFactorie } from "@/services/@factories/make-user-service";
import { FastifyReply, FastifyRequest } from "fastify";

export const getAllUsersController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { getUsersProfileService } = makeUserFactorie();

  const users = await getUsersProfileService.execute();

  reply.send(users);
};
