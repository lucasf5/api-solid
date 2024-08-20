import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("GET /gyms", async () => {
  beforeEach(async () => {
    app.ready();
  });
  afterEach(async () => {
    app.close();
  });
  it("should return a list of gyms", async () => {
    const cookies = await createAndAuthenticateUser();

    const response = await request(app.server)
      .post("/gyn")
      .send({
        title: "Gym 1",
        latitude: 123,
        longitude: 456,
      })
      .set("Cookie", cookies as string);

    expect(response.status).toBe(201);
  });
});
