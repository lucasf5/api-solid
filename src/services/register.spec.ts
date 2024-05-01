import { expect, describe, it, vitest } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

interface Sut {
  registerService: RegisterService;
}

const makeSut = (): Sut => {
  const usersRepository = new InMemoryUsersRepository();
  const registerService = new RegisterService(usersRepository);
  return { registerService };
};

describe("register", () => {
  it("should hash user password upon registration", async () => {
    // Arrange
    const { registerService } = makeSut();

    // Act
    const user = await registerService.execute({
      name: "any_name",
      email: "any_email",
      password: "12345678",
    });

    // Assert
    const isPasswordHashed = await compare("12345678", user.password_hash);
    expect(isPasswordHashed).toBe(true);
  });

  it("should not allow registration with the same email", async () => {
    // Arrange
    const { registerService } = makeSut();

    // Act
    await registerService.execute({
      name: "any_name",
      email: "any_email",
      password: "12345678",
    });

    // Assert
    try {
      await registerService.execute({
        name: "any_name",
        email: "any_email",
        password: "12345678",
      });
    } catch (error: any) {
      expect(error.message).toBe("Email already in use");
      expect(error.statusCode).toBe(409);
    }
  });

  it("should register a user", async () => {
    // Arrange
    const { registerService } = makeSut();

    // Act
    const user = await registerService.execute({
      name: "any_name",
      email: "any_email",
      password: "12345678",
    });

    // Assert
    expect(user.id).toBe("any_id");
    expect(user.name).toBe("any_name");
    expect(user.email).toBe("any_email");
    const isPasswordHashed = await compare("12345678", user.password_hash);
    expect(isPasswordHashed).toBe(true);
  });
});
