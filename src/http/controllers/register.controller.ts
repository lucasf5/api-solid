import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterService } from "@/services/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import CustomError from "@/services/errors/CustomError";

export const registerController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  const usersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(usersRepository);

  await registerService.execute({ name, email, password });

  reply.status(201).send();
};
