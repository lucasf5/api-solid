import { makeRegisterService } from "@/services/@factories/make-register-service";
import { ROLE } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const registerController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum([ROLE.MEMBER, ROLE.ADMIN]).optional().default(ROLE.MEMBER),
  });

  const { name, email, password, role } = registerBodySchema.parse(
    request.body
  );

  const { registerService } = makeRegisterService();

  await registerService.execute({ name, email, password, role });

  reply.status(201).send({
    message: "User created successfully",
  });
};
