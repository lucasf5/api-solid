import { getDistanceBetweenTwoCoordinates } from "@/services/Checkin/utils/get-distance";
import { Gyn, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { GymsRepositoryInterface } from "../interfaces/gyms-repository-interface";

class InMemoryGymsRepository implements GymsRepositoryInterface {
  private Gyms: Gyn[] = [];

  constructor() {
    this.Gyms = [];
  }

  findById(id: string): Promise<Gyn | null> {
    const gym = this.Gyms.find((gym) => gym.id === id);
    return Promise.resolve(gym || null);
  }
  create(data: Prisma.GynCreateInput): Promise<Gyn> {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.Gyms.push(gym);

    return Promise.resolve(gym);
  }
  searchMany(name: string): Promise<Gyn[]> {
    const gym = this.Gyms.filter((gym) => gym.title.includes(name));
    return Promise.resolve(gym);
  }

  nearbyGyms(data: {
    userLatitude: number;
    userLongitude: number;
  }): Promise<Gyn[]> {
    const gyms = this.Gyms.filter((gym) => {
      const distance = getDistanceBetweenTwoCoordinates(
        {
          latitude: data.userLatitude,
          longitude: data.userLongitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        }
      );

      return distance < 10000;
    });

    return Promise.resolve(gyms);
  }
}

export { InMemoryGymsRepository };
