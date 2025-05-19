import { AuthService } from "../src/services/auth-service";

import Knex, { Knex as KnexType } from "knex";
import { Model } from "objection";
import { knexConfig } from "../knexfile";

describe("AuthService", () => {
  let knex: KnexType;
  beforeAll(async () => {
    knex = Knex(knexConfig.test);
    Model.knex(knex);

    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  beforeEach(async () => {
    await knex("users").delete();
  });

  it("can register a new user", async () => {
    //const {authService} = newService();

    const authService = new AuthService();

    const user = await authService.register({
      email: "new_email_beybe@gmail.com",
      username: "krisko-fears",
      password: "chelsea",
    });

    expect(user.email).toEqual("new_email_beybe@gmail.com");
  });
});
