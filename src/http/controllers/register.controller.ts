import { makeRegisterService } from "@/services/@factories/make-register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

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

  const { registerService } = makeRegisterService();

  await registerService.execute({ name, email, password });

  reply.status(201).send({
    message: "User created successfully",
  });
};
