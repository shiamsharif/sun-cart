import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";
import {
  getAppURL,
  getGoogleClientId,
  getGoogleClientSecret,
  getSqlitePath,
  getTrustedOrigins,
} from "@/lib/auth-env";

const database = new Database(getSqlitePath());
const googleClientId = getGoogleClientId();
const googleClientSecret = getGoogleClientSecret();

const googleCredentials =
  googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : {};

export const authOptions = {
  baseURL: getAppURL(),
  trustedOrigins: getTrustedOrigins(),
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

if (process.env.VERCEL) {
  const { getMigrations } = await import(
    "../../node_modules/better-auth/dist/db/get-migration.mjs"
  );
  const migrations = await getMigrations(authOptions);
  await migrations.runMigrations();
}

export const auth = betterAuth(authOptions);
