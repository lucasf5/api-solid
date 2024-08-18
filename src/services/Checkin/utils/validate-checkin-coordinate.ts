import CustomError from "@/services/@errors/CustomError";
import { getDistanceBetweenTwoCoordinates } from "@/services/Checkin/utils/get-distance";
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

  const distance = getDistanceBetweenTwoCoordinates(
    gymCoordinate,
    userCoordinate
  );

  if (distance > MAX_DISTANCE_IN_METERS) {
    throw new CustomError("You are too far from the gym", 400);
  }

  return distance;
};
