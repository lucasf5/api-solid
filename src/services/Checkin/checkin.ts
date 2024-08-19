import { GymsRepositoryInterface } from "@/repositories/interfaces/gyms-repository-interface";
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
    private readonly checkinRepository: CheckinsRepository,
    private readonly gymsRepository: GymsRepositoryInterface
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.getGymOrThrow(gymId);

    validateCheckinCoordinate(gym, userLatitude, userLongitude);

    await this.ensureNoCheckinToday(userId);

    const checkIn = await this.createCheckin(gymId, userId);

    return { checkIn };
  }

  private async getGymOrThrow(gymId: string) {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new CustomError("Gym not found", 404);
    }
    return gym;
  }

  private async ensureNoCheckinToday(userId: string) {
    const checkinToday =
      await this.checkinRepository.findCheckinByUserIdAndDate(
        userId,
        new Date()
      );
    if (checkinToday) {
      throw new CustomError("Check in failed", 400);
    }
  }

  private async createCheckin(gymId: string, userId: string): Promise<CheckIn> {
    const checkIn = await this.checkinRepository.create({
      gyn_id: gymId,
      user_id: userId,
    });

    if (!checkIn) {
      throw new CustomError("Check in failed", 400);
    }

    return checkIn;
  }
}
