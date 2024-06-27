import { Gyn, Prisma } from "@prisma/client";
import { GymsRepositoryInterface } from "../prisma/interfaces/gyms-repository-interface";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

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
}

export { InMemoryGymsRepository };
