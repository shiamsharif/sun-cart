import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

const database = new Database(process.env.SQLITE_DB_PATH || "./suncart.sqlite");

const googleCredentials =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {};

export const authOptions = {
  database,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: googleCredentials,
  user: {
    changeEmail: {
      enabled: false,
    },
  },
  plugins: [nextCookies()],
};

export const auth = betterAuth(authOptions);
