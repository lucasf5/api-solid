import { Gyn, Prisma } from "@prisma/client";

export interface nearbyGymsInterface {
  userLatitude: number;
  userLongitude: number;
}

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gyn | null>;
  create(data: Prisma.GynCreateInput): Promise<Gyn>;
  searchMany(name: string): Promise<Gyn[]>;
  nearbyGyms(data: nearbyGymsInterface): Promise<Gyn[]>;
}
