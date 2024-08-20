import { FastifyReply, FastifyRequest } from "fastify";

interface User {
  role: string;
}

export const AdminRole = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.user as User;
  if (user.role !== "ADMIN") {
    reply.status(403).send({ message: "You are not authorized" });
  }
};
