import { app } from "@/app";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("Profile Controller", () => {
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

    const cookies = await request(app.server)
      .post("/login")
      .send({
        email: "teste@mail.com",
        password: "12345678",
      })
      .then((res) => res.headers["set-cookie"])
      .catch((err) => console.error(err));

    const response = await request(app.server)
      .get("/profile")
      .set("Cookie", cookies as string);

    expect(response.status).toBe(200);
  });
});
