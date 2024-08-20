import { ROLE } from "@prisma/client";
import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      userId: string;
      email: string;
      role: ROLE;
    };
  }
}
