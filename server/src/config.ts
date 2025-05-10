import dotenvx from "@dotenvx/dotenvx";
import convict from "convict";
dotenvx.config();

export const config = convict({
  db: {
    host: {
      format: String,
      default: "localhost",
      env: "DB_HOST",
    },
    port: {
      format: "port",
      default: 5432,
      env: "DB_PORT",
    },
    database: {
      format: String,
      default: "books",
      env: "DB_NAME",
    },
    user: {
      format: String,
      default: "",
      env: "DB_USER",
    },
    password: {
      format: String,
      default: "",
      env: "DB_PASS",
    },
  },
  server: {
    port: {
      format: "port",
      default: 3000,
      env: "SERVER_PORT",
    },
  },

  jwt: {
    secretKey: {
      format: String,
      default: "",
      env: "JWT_SECRET_KEY",
    },
  },
}).validate();
