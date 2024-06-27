import { FastifyRequest, FastifyReply } from "fastify";

export const mainController = async (
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  reply.status(200).send("Hello, world!");
};
