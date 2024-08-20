import { FastifyInstance } from "fastify";

import { CheckinRoutes } from "./checkin.routes";
import { GymsRoutes } from "./gyms.routes";
import { UsersRoutes } from "./users.routes";

export const appRoutes = async (app: FastifyInstance) => {
  await UsersRoutes(app);
  await GymsRoutes(app);
  await CheckinRoutes(app);
};
