import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckinService } from "../Validate-check-in";

export const MakeValidateCheckInService = () => {
  const checkinsRepository = new CheckinsRepository();
  const validateCheckInService = new ValidateCheckinService(checkinsRepository);
  return { validateCheckInService };
};
