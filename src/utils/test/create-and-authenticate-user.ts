import request from "supertest";

import { app } from "@/app";

export async function createAndAuthenticateUser() {
  await request(app.server).post("/register").send({
    name: "any_name",
    email: "any_email@mail.com",
    password: "12345678",
  });
  const cookies = await request(app.server)
    .post("/login")
    .send({
      email: "any_email@mail.com",
      password: "12345678",
    })
    .then((res) => res.headers["set-cookie"]);

  return cookies;
}
