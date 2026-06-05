import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

const productionURL = "https://sun-cart-orpin.vercel.app";
const localURL = "http://localhost:3000";
const vercelURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
const appURL =
  process.env.BETTER_AUTH_URL ||
  vercelURL ||
  (process.env.NODE_ENV === "production" ? productionURL : localURL);
const trustedOrigins = [appURL, productionURL, localURL]
  .map((url) => {
    try {
      return new URL(url).origin;
    } catch {
      return "";
    }
  })
  .filter(Boolean);

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
  baseURL: appURL,
  trustedOrigins: Array.from(new Set(trustedOrigins)),
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
