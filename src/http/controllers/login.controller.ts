import { makeAuthenticateService } from "@/services/@factories/make-login-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const LoginController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authBodySchema.parse(req.body);

  const { authenticateService } = makeAuthenticateService();

  const { token, user } = await authenticateService.execute({
    email,
    password,
  });

  reply.setCookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });

  reply.status(200).send({ user });
};
