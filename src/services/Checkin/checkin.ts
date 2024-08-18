import { GymsRepositoryInterface } from "@/repositories/prisma/interfaces/gyms-repository-interface";
import { CheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckIn } from "@prisma/client";
import CustomError from "../@errors/CustomError";
import { validateCheckinCoordinate } from "./utils/validate-checkin-coordinate";

interface CheckinServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckinServiceResponse {
  checkIn: CheckIn;
}

export class CheckinService {
  constructor(
    private checkinRepository: CheckinsRepository,
    private gymsRepository: GymsRepositoryInterface
  ) {
    this.checkinRepository = checkinRepository;
  }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new CustomError("Gym not found", 404);
    }

    validateCheckinCoordinate(gym, userLatitude, userLongitude);

    const checkinByUserIdAndDate =
      await this.checkinRepository.findCheckinByUserIdAndDate(
        userId,
        new Date()
      );

    if (checkinByUserIdAndDate !== null) {
      throw new CustomError("Check in failed", 400);
    }

    const checkIn = await this.checkinRepository.create({
      gyn_id: gymId,
      user_id: userId,
    });

    if (!checkIn) {
      throw new CustomError("Check in failed", 400);
    }

    return { checkIn };
  }
}
