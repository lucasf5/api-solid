import CustomError from "@/services/@errors/CustomError";
import { getDistance } from "@/ultis/get-distance";
import { Gyn } from "@prisma/client";

const MAX_DISTANCE_IN_METERS = 1000;

export const validateCheckinCoordinate = (
  gym: Gyn,
  userLatitude: number,
  userLongitude: number
): number => {
  const gymCoordinate = {
    latitude: Number(gym.latitude),
    longitude: Number(gym.longitude),
  };
  const userCoordinate = { latitude: userLatitude, longitude: userLongitude };

  const distance = getDistance(gymCoordinate, userCoordinate);

  if (distance > MAX_DISTANCE_IN_METERS) {
    throw new CustomError("You are too far from the gym", 400);
  }

  return distance;
};
