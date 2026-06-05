const productionURL = "https://sun-cart-orpin.vercel.app";
const localURL = "http://localhost:3000";

export function getAppURL() {
  const configuredURL =
    process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "";
  const vercelURL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  if (process.env.VERCEL && isLocalhostURL(configuredURL)) {
    return vercelURL || productionURL;
  }

  return (
    configuredURL ||
    vercelURL ||
    (process.env.NODE_ENV === "production" ? productionURL : localURL)
  );
}

export function getAppOrigin() {
  try {
    return new URL(getAppURL()).origin;
  } catch {
    return productionURL;
  }
}

export function getTrustedOrigins() {
  const envOrigins = (process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const origins = [getAppURL(), productionURL, localURL, ...envOrigins]
    .map((url) => {
      try {
        return new URL(url).origin;
      } catch {
        return "";
      }
    })
    .filter(Boolean);

  return Array.from(new Set(origins));
}

export function getGoogleClientId() {
  return (
    process.env.GOOGLE_CLIENT_ID ||
    process.env.AUTH_GOOGLE_ID ||
    process.env.AUTH_GOOGLE_CLIENT_ID ||
    ""
  );
}

export function getGoogleClientSecret() {
  return (
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.AUTH_GOOGLE_SECRET ||
    process.env.AUTH_GOOGLE_CLIENT_SECRET ||
    ""
  );
}

export function getSqlitePath() {
  if (process.env.VERCEL) {
    const configuredPath = process.env.SQLITE_DB_PATH || "";

    if (configuredPath.startsWith("/tmp/")) {
      return configuredPath;
    }

    return "/tmp/suncart.sqlite";
  }

  return process.env.SQLITE_DB_PATH || "./suncart.sqlite";
}

export function getAuthEnvironmentStatus() {
  const appURL = getAppURL();

  return {
    appURL,
    callbackURL: `${getAppOrigin()}/api/auth/callback/google`,
    betterAuthSecret: Boolean(process.env.BETTER_AUTH_SECRET),
    googleClientId: Boolean(getGoogleClientId()),
    googleClientSecret: Boolean(getGoogleClientSecret()),
    ignoredLocalhostAuthURL: Boolean(
      process.env.VERCEL &&
        isLocalhostURL(
          process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        ),
    ),
    sqlitePath: getSqlitePath(),
    trustedOrigins: getTrustedOrigins(),
  };
}

function isLocalhostURL(url) {
  try {
    const hostname = new URL(url || "").hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}
