import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { LoginService } from "./login";

interface Sut {
  loginService: LoginService;
  usersRepository: InMemoryUsersRepository;
}

const makeSut = (): Sut => {
  const usersRepository = new InMemoryUsersRepository();
  const loginService = new LoginService(usersRepository);
  return { loginService, usersRepository };
};

describe("Login", () => {
  it("should Login a user", async () => {
    // Arrange
    const { loginService, usersRepository } = makeSut();

    await usersRepository.create({
      name: "any_name",
      email: "any_email",
      password_hash: await hash("12345678", 4),
    });

    // Act
    const body = await loginService.execute({
      email: "any_email",
      password: "12345678",
    });

    // Assert
    expect(body.user).toBeDefined();
  });

  it("should not Login a user with invalid email", async () => {
    // Arrange
    const { loginService } = makeSut();

    // Act
    try {
      await loginService.execute({
        email: "invalid_email",
        password: "12345678",
      });
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Email or password incorrect");
      expect(error.statusCode).toBe(401);
    }
  });

  it("should not Login a user with invalid password", async () => {
    // Arrange
    const { loginService, usersRepository } = makeSut();

    await usersRepository.create({
      name: "any_name",
      email: "any_email",
      password_hash: await hash("12345678", 4),
    });

    // Act
    try {
      await loginService.execute({
        email: "any_email",
        password: "invalid_password",
      });
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Email or password incorrect");
      expect(error.statusCode).toBe(401);
    }
  });
});
