import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, expect, it } from "vitest";
import { FetchnearbyGymsService } from ".";

interface Sut {
  gymsRepository: InMemoryGymsRepository;
  fetchNearbyGymsService: FetchnearbyGymsService;
}

const makeSut = (): Sut => {
  const gymsRepository = new InMemoryGymsRepository();
  const fetchNearbyGymsService = new FetchnearbyGymsService(gymsRepository);

  return {
    gymsRepository,
    fetchNearbyGymsService,
  };
};

describe("Fetch nearby gyms", () => {
  it("should return a list of nearby gyms", async () => {
    const { gymsRepository, fetchNearbyGymsService } = makeSut();

    await gymsRepository.create({
      title: "Gym 1",
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      title: "Gym 2",
      latitude: 0.1,
      longitude: 0.1,
    });

    await gymsRepository.create({
      title: "Gym 3",
      latitude: 0.2,
      longitude: 0.2,
    });

    const response = await fetchNearbyGymsService.execute({
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(response.gyms).toHaveLength(1);
  });

  it("should return an empty list if there are no nearby gyms", async () => {
    const { gymsRepository, fetchNearbyGymsService } = makeSut();

    await gymsRepository.create({
      title: "Gym 1",
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      title: "Gym 2",
      latitude: 0.1,
      longitude: 0.1,
    });

    await gymsRepository.create({
      title: "Gym 3",
      latitude: 0.2,
      longitude: 0.2,
    });

    const response = await fetchNearbyGymsService.execute({
      userLatitude: 10,
      userLongitude: 10,
    });

    expect(response.gyms).toHaveLength(0);
  });

  it("should return a list of nearby gyms within 10km", async () => {
    const { gymsRepository, fetchNearbyGymsService } = makeSut();

    await gymsRepository.create({
      title: "Gym 1",
      latitude: 0.08,
      longitude: 0.02,
    }); // 9169m

    await gymsRepository.create({
      title: "Gym 2",
      latitude: 0.1,
      longitude: 0.1,
    }); // 0m

    await gymsRepository.create({
      title: "Gym 3",
      latitude: 0.2,
      longitude: 0.2,
    }); // 15686m

    const response = await fetchNearbyGymsService.execute({
      userLatitude: 0.1,
      userLongitude: 0.1,
    });

    expect(response.gyms).toHaveLength(2);
  });
});
