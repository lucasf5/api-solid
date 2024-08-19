import { FastifyInstance } from "fastify";

import { LoginController } from "@/http/controllers/login.controller";
import { mainController } from "@/http/controllers/main.controller";
import { registerController } from "@/http/controllers/register.controller";
import { ProfileController } from "../controllers/profile.controller";
import { getAllUsersController } from "../controllers/users.controller";
import { authenticate } from "../middleware/authenticate";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/", mainController);
  app.post("/register", registerController);
  app.get("/users", { preHandler: [authenticate] }, getAllUsersController);
  app.post("/login", LoginController);
  app.get("/profile", { preHandler: [authenticate] }, ProfileController);
};
