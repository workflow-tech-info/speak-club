import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /app routes
  if (pathname.startsWith("/app")) {
    const authCookie = request.cookies.get("sc_auth");
    if (!authCookie || authCookie.value !== "1") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is authed and visits /login, redirect to /app
  if (pathname === "/login") {
    const authCookie = request.cookies.get("sc_auth");
    if (authCookie && authCookie.value === "1") {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login"],
};
