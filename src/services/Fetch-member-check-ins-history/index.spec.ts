import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FetchMemberCheckInsHistoryService } from ".";
import { CheckinService } from "../Checkin/checkin";

interface Sut {
  checkinService: CheckinService;
  checkinsRepository: InMemoryCheckinsRepository;
  gymsRepository: InMemoryGymsRepository;
  userRepository: InMemoryUsersRepository;
  fetchMemberCheckInsHistoryService: FetchMemberCheckInsHistoryService;
}

const makeSut = (): Sut => {
  const userRepository = new InMemoryUsersRepository();
  const gymsRepository = new InMemoryGymsRepository();
  const checkinsRepository = new InMemoryCheckinsRepository();
  const checkinService = new CheckinService(checkinsRepository, gymsRepository);
  const fetchMemberCheckInsHistoryService =
    new FetchMemberCheckInsHistoryService(checkinsRepository);

  return {
    checkinService,
    userRepository,
    gymsRepository,
    checkinsRepository,
    fetchMemberCheckInsHistoryService,
  };
};

describe("Fetch member check-ins history", () => {
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
  it("should return a list of check-ins", async () => {
    await sut.checkinService.execute({
      gymId: gym.id,
      userId: user.id,
      userLatitude: -23.5455,
      userLongitude: -46.6333,
    });

    vi.setSystemTime(new Date(2021, 1, 1, 10, 0, 0));
    await sut.checkinService.execute({
      gymId: gym.id,
      userId: user.id,
      userLatitude: -23.5455,
      userLongitude: -46.6333,
    });

    vi.setSystemTime(new Date(2021, 1, 2, 10, 0, 0));
    await sut.checkinService.execute({
      gymId: gym.id,
      userId: user.id,
      userLatitude: -23.5455,
      userLongitude: -46.6333,
    });

    const body = await sut.fetchMemberCheckInsHistoryService.execute({
      userId: user.id,
      page: 1,
    });

    expect(body.checkIns).toHaveLength(3);
  });

  it("should be able to fetch paginated check-ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      vi.setSystemTime(new Date(2021, 1, i + 1, 10, 0, 0));
      await sut.checkinService.execute({
        gymId: gym.id,
        userId: user.id,
        userLatitude: -23.5455,
        userLongitude: -46.6333,
      });
    }

    const body = await sut.fetchMemberCheckInsHistoryService.execute({
      userId: user.id,
      page: 2,
    });

    expect(body.checkIns).toHaveLength(2);
    expect(body.checkIns[0].created_at).toEqual(
      new Date(2021, 1, 22, 10, 0, 0)
    );
    expect(body.checkIns[1].created_at).toEqual(
      new Date(2021, 1, 23, 10, 0, 0)
    );
  });
});
