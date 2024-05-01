import { FastifyInstance } from "fastify";

import { registerController } from "@/http/controllers/register.controller";
import { mainController } from "../controllers/main.controller";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/", mainController);
  app.post("/user", registerController);
};
