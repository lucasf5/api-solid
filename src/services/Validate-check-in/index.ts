import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckIn } from "@prisma/client";
import CustomError from "../@errors/CustomError";

interface ValidateCheckinServiceRequest {
  checkInId: string;
}

interface ValidateCheckinServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckinService {
  constructor(private readonly checkinRepository: CheckinsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinServiceRequest): Promise<ValidateCheckinServiceResponse> {
    const checkIn = await this.checkinRepository.findCheckinById(checkInId);

    if (!checkIn) {
      throw new CustomError("Check in not found", 404);
    }

    const checkInDate = checkIn.created_at;
    const now = new Date();

    const diff = now.getTime() - checkInDate.getTime();

    if (diff > 20 * 60 * 1000) {
      throw new CustomError("Check in expired", 400);
    }

    checkIn.validated_at = new Date();

    await this.checkinRepository.save(checkIn);

    return { checkIn };
  }
}
