import { makeAuthenticateService } from "@/services/@factories/make-login-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const LoginController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authBodySchema.parse(request.body);

  const { authenticateService } = makeAuthenticateService();

  const { user } = await authenticateService.execute({
    email,
    password,
  });

  const token = await reply.jwtSign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    {
      expiresIn: "1d",
    }
  );

  reply.setCookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    path: "/",
  });

  reply.status(200).send({ user });
};
