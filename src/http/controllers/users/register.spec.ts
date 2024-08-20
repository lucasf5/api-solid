import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return 200 if user is created", async () => {
    const response = await request(app.server).post("/register").send({
      name: "Teste",
      email: "teste@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
  });

  it("should return 400 if email is invalid", async () => {
    const response = await request(app.server).post("/register").send({
      name: "Teste",
      email: "teste",
      password: "12345678",
    });

    expect(response.status).toBe(400);
  });

  it("should return 400 if password is invalid", async () => {
    const response = await request(app.server).post("/register").send({
      name: "Teste",
      email: "teste2@mail.com",
      password: "123",
    });

    expect(response.status).toBe(400);
  });
});
