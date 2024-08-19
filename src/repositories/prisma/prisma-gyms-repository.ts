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
  async searchMany(name: string, page: number): Promise<Gyn[]> {
    return await prisma.gyn.findMany({
      where: {
        title: {
          contains: name,
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
    return await prisma.$queryRaw<
      Gyn[]
    >`SELECT * FROM gyms WHERE ST_Distance_Sphere(geom, ST_MakePoint(${data.userLatitude}, ${data.userLongitude})) < 10000`;
  }
}
