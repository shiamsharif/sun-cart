import { existsSync, readFileSync } from "node:fs";

for (const file of [".env", ".env.local"]) {
  if (!existsSync(file)) continue;

  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator);
    const value = trimmed.slice(separator + 1).replace(/^['"]|['"]$/g, "");
    process.env[key] ??= value;
  }
}

const { getMigrations } = await import(
  "../node_modules/better-auth/dist/db/get-migration.mjs"
);
const { authOptions } = await import("../src/lib/auth.js");

const migrations = await getMigrations(authOptions);
const sql = await migrations.compileMigrations();

if (!sql.trim()) {
  console.log("Better Auth database schema is already up to date.");
  process.exit(0);
}

await migrations.runMigrations();
console.log("Better Auth database schema migrated.");
