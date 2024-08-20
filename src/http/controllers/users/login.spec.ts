import { app } from "@/app";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("Login Controller", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });
  it("should return 200 if user is authenticated", async () => {
    await request(app.server).post("/register").send({
      name: "Teste",
      email: "teste@mail.com",
      password: "12345678",
    });

    const response = await request(app.server).post("/login").send({
      email: "teste@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user: {
        id: expect.any(String),
        name: "Teste",
        email: "teste@mail.com",
        password_hash: expect.any(String),
        created_at: expect.any(String),
      },
    });
  });
});
