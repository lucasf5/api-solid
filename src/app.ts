import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "token",
    signed: true,
  },
  sign: {
    expiresIn: "1h",
  },
});

app.register(appRoutes);
app.register(fastifyCookie);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation failed",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  }

  throw error;
});
