import { Gyn } from "@prisma/client";

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gyn | null>;
  create(data: any): Promise<Gyn>;
  SearchMany(name: string): Promise<Gyn[]>;
}
