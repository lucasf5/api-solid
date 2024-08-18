import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { CheckinService } from "@/services/Checkin/checkin";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

interface Sut {
  checkinService: CheckinService;
  checkinsRepository: InMemoryCheckinsRepository;
  gymsRepository: InMemoryGymsRepository;
  userRepository: InMemoryUsersRepository;
}

const makeSut = (): Sut => {
  const checkinsRepository = new InMemoryCheckinsRepository();
  const gymsRepository = new InMemoryGymsRepository();
  const checkinService = new CheckinService(checkinsRepository, gymsRepository);
  const userRepository = new InMemoryUsersRepository();
  return { checkinService, checkinsRepository, gymsRepository, userRepository };
};

describe("checkin", () => {
  let sut: Sut;
  let gym: { id: string };
  let user: { id: string };

  beforeEach(async () => {
    vi.useFakeTimers();
    sut = makeSut();

    gym = await sut.gymsRepository.create({
      title: "Academia 1",
      latitude: -23.5505,
      longitude: -46.6333,
    });

    user = await sut.userRepository.create({
      name: "User 1",
      email: "user@gmail.com",
      password_hash: "123456",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a checkin", async () => {
    const body = await sut.checkinService.execute({
      gymId: gym.id,
      userId: user.id,
      userLatitude: -23.5455,
      userLongitude: -46.6333,
    });

    expect(body.checkIn.id).toBeDefined();
  });

  it("should throw an error if user tries to realize more than 1 check-in on the same day", async () => {
    await sut.checkinService.execute({
      gymId: gym.id,
      userId: user.id,
      userLatitude: -23.5455,
      userLongitude: -46.6333,
    });

    await expect(
      sut.checkinService.execute({
        gymId: gym.id,
        userId: user.id,
        userLatitude: -23.5455,
        userLongitude: -46.6333,
      })
    ).rejects.toThrowError("Check in failed");
  });

  it("should allow check-in on different days", async () => {
    vi.setSystemTime(new Date(2022, 1, 1, 10, 0, 0));

    await sut.checkinsRepository.create({
      gyn_id: gym.id,
      user_id: user.id,
    });

    vi.setSystemTime(new Date(2022, 1, 2, 10, 0, 0));

    const body = await sut.checkinService.execute({
      gymId: gym.id,
      userId: user.id,
      userLatitude: -23.5455,
      userLongitude: -46.6333,
    });

    expect(body.checkIn.id).toBeDefined();
  });

  it("should not throw an error if the user is close to the gym", async () => {
    const body = await sut.checkinService.execute({
      gymId: gym.id,
      userId: user.id,
      userLatitude: -23.5455,
      userLongitude: -46.6333,
    });

    expect(body.checkIn.id).toBeDefined();
  });

  it("should throw an error if the user is too far from the gym", async () => {
    await expect(
      sut.checkinService.execute({
        gymId: gym.id,
        userId: user.id,
        userLatitude: -23.5405, // Latitude far from the gym
        userLongitude: -46.6333, // Longitude far from the gym
      })
    ).rejects.toThrowError("You are too far from the gym");
  });
});
