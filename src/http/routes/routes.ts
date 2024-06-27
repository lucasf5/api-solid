import { FastifyInstance } from "fastify";

import { registerController } from "@/http/controllers/register.controller";
import { mainController } from "@/http/controllers/main.controller";
import { AuthenticateController } from "@/http/controllers/authenticate.controller";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/", mainController);
  app.post("/user", registerController);
  app.post("/sessions", AuthenticateController);
};
