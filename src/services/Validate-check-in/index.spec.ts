import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateCheckinService } from ".";

interface Sut {
  validateCheckinService: ValidateCheckinService;
  checkinsRepository: InMemoryCheckinsRepository;
}

const makeSut = (): Sut => {
  const checkinsRepository = new InMemoryCheckinsRepository();
  const validateCheckinService = new ValidateCheckinService(checkinsRepository);

  return {
    validateCheckinService,
    checkinsRepository,
  };
};

describe("validate checkin", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should validate a checkin", async () => {
    const { validateCheckinService, checkinsRepository } = makeSut();

    const checkin = await checkinsRepository.create({
      gyn_id: "gym-id",
      user_id: "user-id",
    });

    const response = await validateCheckinService.execute({
      checkInId: checkin.id,
    });

    expect(response.checkIn.validated_at).not.toBe(null);
  });

  it("should validate in 20 minutes", async () => {
    const { validateCheckinService, checkinsRepository } = makeSut();

    vi.setSystemTime(new Date("2021-01-01T12:00:00"));
    const checkin = await checkinsRepository.create({
      gyn_id: "gym-id",
      user_id: "user-id",
    });

    vi.setSystemTime(new Date("2021-01-01T12:30:00"));

    try {
      await validateCheckinService.execute({
        checkInId: checkin.id,
      });
    } catch (error) {
      expect(error.message).toBe("Check in expired");
    }
  });

  it("should throw if checkin not found", async () => {
    const { validateCheckinService } = makeSut();

    try {
      await validateCheckinService.execute({
        checkInId: "invalid-id",
      });
    } catch (error) {
      expect(error.message).toBe("Check in not found");
    }
  });
});
