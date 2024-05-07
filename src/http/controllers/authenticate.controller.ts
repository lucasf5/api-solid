import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { makeAuthenticateService } from "@/services/@factories/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const AuthenticateController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authBodySchema.parse(req.body);

  const { authenticateService } = makeAuthenticateService();

  const response = await authenticateService.execute({ email, password });

  reply.send(response);
};
