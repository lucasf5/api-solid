import { FastifyInstance } from "fastify";

import { LoginController } from "@/http/controllers/users/login.controller";
import { registerController } from "@/http/controllers/users/register.controller";
import { ProfileController } from "../controllers/users/profile.controller";
import { getAllUsersController } from "../controllers/users/users.controller";
import { authenticate } from "../middleware/authenticate";

export const UsersRoutes = async (app: FastifyInstance) => {
  app.post("/register", registerController);
  app.get("/users", { preHandler: [authenticate] }, getAllUsersController);
  app.post("/login", LoginController);
  app.get("/profile", { preHandler: [authenticate] }, ProfileController);
  app.post("/logout", async (request, reply) => {
    reply.clearCookie("token");
    reply.status(200).send({ message: "Logout successful" });
  });
};
