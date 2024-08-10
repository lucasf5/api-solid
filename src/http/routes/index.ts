import { FastifyInstance } from "fastify";

import { AuthenticateController } from "@/http/controllers/authenticate.controller";
import { mainController } from "@/http/controllers/main.controller";
import { registerController } from "@/http/controllers/register.controller";
import { getAllUsersController } from "../controllers/users.controller";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/", mainController);
  app.post("/user", registerController);
  app.get("/users", getAllUsersController);
  app.post("/sessions", AuthenticateController);
};
