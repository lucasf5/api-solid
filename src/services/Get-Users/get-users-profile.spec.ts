import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { RegisterService } from "../Register/register";
import { GetUsersProfileService } from "./get-users-profile";

interface Sut {
  getUsersProfileService: GetUsersProfileService;
  registerUserService: RegisterService;
}

const makeSut = (): Sut => {
  const usersRepository = new InMemoryUsersRepository();
  const getUsersProfileService = new GetUsersProfileService(usersRepository);
  const registerUserService = new RegisterService(usersRepository);
  return { getUsersProfileService, registerUserService };
};

describe("get all users", () => {
  it("should return all users", async () => {
    // Arrange
    const { getUsersProfileService } = makeSut();

    // Act
    const users = await getUsersProfileService.execute();

    // Assert
    expect(users).toEqual({ users: [] });
  });

  it("should return all users", async () => {
    // Arrange
    const { getUsersProfileService, registerUserService } = makeSut();

    // Act
    await registerUserService.execute({
      email: "any_email",
      name: "any_name",
      password: "any_password",
    });
    await registerUserService.execute({
      email: "any_email_2",
      name: "any_name",
      password: "any_password",
    });
    await registerUserService.execute({
      email: "any_email_3",
      name: "any_name",
      password: "any_password",
    });

    const users = await getUsersProfileService.execute();

    // Assert
    expect(users.users).toHaveLength(3);
  });
});
