import { MakeGetUsersService } from "@/services/@factories/make-get-users-service";
import { FastifyReply, FastifyRequest } from "fastify";

export const getAllUsersController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { getUsersProfileService } = MakeGetUsersService();

  const users = await getUsersProfileService.execute();

  reply.send(users);
};
