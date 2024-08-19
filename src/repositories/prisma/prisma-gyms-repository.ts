import { prisma } from "@/lib/prisma";
import CustomError from "@/services/@errors/CustomError";
import { Gyn } from "@prisma/client";
import { GymsRepositoryInterface } from "../interfaces/gyms-repository-interface";

export class GymsRepository implements GymsRepositoryInterface {
  findById(id: string): Promise<Gyn | null> {
    return prisma.gyn.findUnique({
      where: {
        id,
      },
    });
  }
  create(data: any): Promise<Gyn> {
    try {
      return prisma.gyn.create({
        data,
      });
    } catch (error) {
      throw new CustomError("Gym not created", 400);
    }
  }
  searchMany(name: string): Promise<Gyn[]> {
    return prisma.gyn.findMany({
      where: {
        title: {
          contains: name,
        },
      },
    });
  }
  nearbyGyms(data: {
    userLatitude: number;
    userLongitude: number;
  }): Promise<Gyn[]> {
    return prisma.gyn.findMany({
      where: {
        latitude: {
          lt: data.userLatitude + 0.5,
          gt: data.userLatitude - 0.5,
        },
        longitude: {
          lt: data.userLongitude + 0.5,
          gt: data.userLongitude - 0.5,
        },
      },
    });
  }
}
