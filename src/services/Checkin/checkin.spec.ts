import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { CheckinService } from "@/services/Checkin/checkin";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

interface Sut {
  checkinService: CheckinService;
  checkinsRepository: InMemoryCheckinsRepository;
  gymsRepository: InMemoryGymsRepository;
}

const makeSut = (): Sut => {
  const checkinsRepository = new InMemoryCheckinsRepository();
  const gymsRepository = new InMemoryGymsRepository();
  const checkinService = new CheckinService(checkinsRepository, gymsRepository);
  return { checkinService, checkinsRepository, gymsRepository };
};

describe("checkin", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a checkin", async () => {
    const { checkinService, gymsRepository } = makeSut();

    await gymsRepository.create({
      id: "1",
      title: "Academia 1",
      latitude: 1,
      longitude: 1,
    });

    const body = await checkinService.execute({
      gymId: "1",
      userId: "1",
      userLatitude: 1,
      userLongitude: 1,
    });

    expect(body.checkIn.id).toBeDefined();
  });

  it("should throw an error if user try realize more 1 check in same day", async () => {
    const { checkinService, gymsRepository } = makeSut();

    await gymsRepository.create({
      id: "1",
      title: "Academia 1",
      latitude: 1,
      longitude: 1,
    });

    await checkinService.execute({
      gymId: "1",
      userId: "1",
      userLatitude: 1,
      userLongitude: 1,
    });

    expect(
      checkinService.execute({
        gymId: "1",
        userId: "1",
        userLatitude: 1,
        userLongitude: 1,
      })
    ).rejects.toThrowError("Check in failed");
  });

  it("should ok if user try realize more 1 check in different day", async () => {
    const { checkinService, gymsRepository, checkinsRepository } = makeSut();

    await gymsRepository.create({
      id: "1",
      title: "Academia 1",
      latitude: 1,
      longitude: 1,
    });

    vi.setSystemTime(new Date(2022, 1, 1, 10, 0, 0));

    await checkinsRepository.create({
      gyn_id: "1",
      user_id: "1",
    });

    vi.setSystemTime(new Date(2022, 1, 2, 10, 0, 0));

    const body = await checkinService.execute({
      gymId: "1",
      userId: "1",
      userLatitude: 1,
      userLongitude: 1,
    });

    expect(body.checkIn.id).toBeDefined();
  });

  it("should no error if user is not distante by gym", async () => {
    const { checkinService, gymsRepository } = makeSut();

    await gymsRepository.create({
      id: "1",
      title: "Academia 1",
      latitude: -3.738702,
      longitude: -38.5592218,
    });

    const body = await checkinService.execute({
      gymId: "1",
      userId: "1",
      userLatitude: -3.738702,
      userLongitude: -38.5592218,
    });

    expect(body.checkIn.id).toBeDefined();
  });

  it("should throw an error if user is distante by gym", async () => {
    const { checkinService, gymsRepository } = makeSut();

    await gymsRepository.create({
      id: "1",
      title: "Academia 1",
      latitude: -3.738702,
      longitude: -38.5592218,
    });

    expect(
      checkinService.execute({
        gymId: "1",
        userId: "1",
        userLatitude: -3.7441681,
        userLongitude: -38.6494438,
      })
    ).rejects.toThrowError("You are too far from the gym");
  });
});
