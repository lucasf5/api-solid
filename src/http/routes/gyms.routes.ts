import { FastifyInstance } from "fastify";

import { CreateGymController } from "../controllers/gyms/create-gym.controller";
import { GetGymController } from "../controllers/gyms/get-gym.controller";
import { GetNearbyGymController } from "../controllers/gyms/get-nearby-gym.controller";
import { authenticate } from "../middleware/authenticate";

export const GymsRoutes = async (app: FastifyInstance) => {
  app.post(
    "/gyn",
    {
      preHandler: [authenticate],
    },
    CreateGymController
  );
  app.get("/gyn", { preHandler: [authenticate] }, GetGymController);
  app.get("/gyms", { preHandler: [authenticate] }, GetNearbyGymController);
};
