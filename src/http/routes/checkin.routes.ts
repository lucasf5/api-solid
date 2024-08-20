import { FastifyInstance } from "fastify";
import { history } from "../controllers/checkins/checkIns-history.controller";
import { createCheckinController } from "../controllers/checkins/create-checkin.controller";
import { validateCheckinController } from "../controllers/checkins/validate-checkin.controller";
import { authenticate } from "../middleware/authenticate";
import { AdminRole } from "../middleware/rbac";

export const CheckinRoutes = async (app: FastifyInstance) => {
  app.post("/checkin", { preHandler: [authenticate] }, createCheckinController);
  app.put(
    "/checkin/:id",
    { preHandler: [authenticate, AdminRole] },
    validateCheckinController
  );
  app.get("/checkin", { preHandler: [authenticate] }, history);
};
