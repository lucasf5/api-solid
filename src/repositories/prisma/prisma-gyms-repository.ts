import { prisma } from "@/lib/prisma";
import CustomError from "@/services/@errors/CustomError";
import { Gyn } from "@prisma/client";
import { GymsRepositoryInterface } from "../interfaces/gyms-repository-interface";

export class GymsRepository implements GymsRepositoryInterface {
  async findById(id: string): Promise<Gyn | null> {
    return await prisma.gyn.findUnique({
      where: {
        id,
      },
    });
  }
  async create(data: any): Promise<Gyn> {
    try {
      return await prisma.gyn.create({
        data,
      });
    } catch (error) {
      throw new CustomError("Gym not created", 400);
    }
  }
  async searchMany(title: string, page: number): Promise<Gyn[]> {
    return await prisma.gyn.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }
  async nearbyGyms(data: {
    userLatitude: number;
    userLongitude: number;
  }): Promise<Gyn[]> {
    const { userLatitude, userLongitude } = data;
    try {
      return await prisma.$queryRaw<
        Gyn[]
      >`SELECT * from gyms WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    } catch (error) {
      console.error("Error fetching nearby gyms:", error);
      throw new CustomError("Gyms not found", 404);
    }
  }
}
