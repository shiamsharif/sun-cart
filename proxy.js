import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/products/"];

export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected || getSessionCookie(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirectTo", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/profile/:path*", "/products/:path*"],
};
