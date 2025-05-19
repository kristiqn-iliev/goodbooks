import { Knex } from "knex";
import { config as envConfig } from "./src/config";
import { knexSnakeCaseMappers } from "objection";

const connection = envConfig.get("db");

const dbServerConfig = {
  host: envConfig.get("db.host"),
  port: envConfig.get("db.port"),
  user: envConfig.get("db.user"),
  password: envConfig.get("db.password"),
};

export const knexConfig = {
  development: {
    client: "pg",
    connection: {
      ...dbServerConfig,
      database: envConfig.get("db.database"),
    },
    ...knexSnakeCaseMappers(),
    debug: true,
  },

  test: {
    client: "pg",
    connection: {
      ...dbServerConfig,
      ...dbServerConfig,
      database: envConfig.get("db.testDatabase"),
    },
    ...knexSnakeCaseMappers(),
    debug: false,
  },
} satisfies Record<string, Knex.Config>;

export default knexConfig.development;
