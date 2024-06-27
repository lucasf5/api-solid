import { expect, describe, it, beforeAll, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate";

interface Sut {
  authenticateService: AuthenticateService;
  usersRepository: InMemoryUsersRepository;
}

const makeSut = (): Sut => {
  const usersRepository = new InMemoryUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);
  return { authenticateService, usersRepository };
};

describe("authenticate", () => {
  it("should authenticate a user", async () => {
    // Arrange
    const { authenticateService, usersRepository } = makeSut();

    await usersRepository.create({
      name: "any_name",
      email: "any_email",
      password_hash: await hash("12345678", 4),
    });

    // Act
    const body = await authenticateService.execute({
      email: "any_email",
      password: "12345678",
    });

    // Assert
    expect(body.token).toBeDefined();
  });

  it("should not authenticate a user with invalid email", async () => {
    // Arrange
    const { authenticateService } = makeSut();

    // Act
    try {
      await authenticateService.execute({
        email: "invalid_email",
        password: "12345678",
      });
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Email or password incorrect");
      expect(error.statusCode).toBe(401);
    }
  });

  it("should not authenticate a user with invalid password", async () => {
    // Arrange
    const { authenticateService, usersRepository } = makeSut();

    await usersRepository.create({
      name: "any_name",
      email: "any_email",
      password_hash: await hash("12345678", 4),
    });

    // Act
    try {
      await authenticateService.execute({
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
