import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { GetUserProfileService } from "./get-user-profile";

interface Sut {
  getUserProfileService: GetUserProfileService;
  usersRepository: InMemoryUsersRepository;
}

const makeSut = (): Sut => {
  const usersRepository = new InMemoryUsersRepository();
  const getUserProfileService = new GetUserProfileService(usersRepository);
  return { getUserProfileService, usersRepository };
};

describe("getUserProfile", () => {
  it("should return the user profile", async () => {
    // Arrange
    const { getUserProfileService, usersRepository } = makeSut();

    const user = await usersRepository.create({
      id: "1",
      email: "johnDoe@mail.com",
      name: "John Doe",
      password_hash: "any_hash",
      created_at: new Date(),
    });

    // Act
    const body = await getUserProfileService.execute({
      userId: user.id,
    });

    // Assert
    expect(body.user).toEqual(user);
  });

  it("should throw an error if the user is not found", async () => {
    // Arrange
    const { getUserProfileService } = makeSut();

    // Act
    const promise = getUserProfileService.execute({
      userId: "1",
    });

    // Assert
    await expect(promise).rejects.toThrow("User not found");
  });
});
