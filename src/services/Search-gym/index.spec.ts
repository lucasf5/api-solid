import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, expect, it } from "vitest";
import { SearchGynService } from ".";

interface Sut {
  checkinsRepository: InMemoryCheckinsRepository;
  gymsRepository: InMemoryGymsRepository;
  getGym: SearchGynService;
}

const makeSut = (): Sut => {
  const gymsRepository = new InMemoryGymsRepository();
  const checkinsRepository = new InMemoryCheckinsRepository();
  const getGym = new SearchGynService(gymsRepository);

  return {
    gymsRepository,
    checkinsRepository,
    getGym,
  };
};

describe("Fetch member check-ins history", () => {
  it("should return a list of gyms by name", async () => {
    const sut = makeSut();

    await sut.gymsRepository.create({
      title: "Academia 1",
      latitude: -23.5505,
      longitude: -46.6333,
    });

    await sut.gymsRepository.create({
      title: "Academia 2",
      latitude: -23.5505,
      longitude: -46.6333,
    });

    const response = await sut.getGym.execute({ title: "Academia", page: 1 });

    expect(response.gyms.length).toBe(2);
  });
});
