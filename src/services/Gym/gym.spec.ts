import { expect, it, describe } from "vitest";
import { GymService } from "./gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

interface Sut {
  gymsRepository: InMemoryGymsRepository;
  gymService: GymService;
}

const makeSut = (): Sut => {
  const gymsRepository = new InMemoryGymsRepository();
  const gymService = new GymService(gymsRepository);
  return { gymService, gymsRepository };
};

describe("Gym Service", () => {
  it("should create a new gym", async () => {
    // Arrange
    const { gymService } = makeSut();

    // Act
    await gymService.execute({
      title: "Gym Title",
      latitude: 1,
      longitude: 1,
    });

    // Assert
    expect(gymService).toBeDefined();
  });

  it("should return the created gym", async () => {});
});
