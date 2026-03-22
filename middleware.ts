import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { insforge } from "./lib/insforge";

export async function middleware(request: NextRequest) {
  const { data } = await insforge.auth.getCurrentSession();
  const isAuthenticated = !!data.session;
  const { pathname } = request.nextUrl;
  
  const isAppRoute = pathname.startsWith("/app");
  const isLoginRoute = pathname === "/login";

  if (isAppRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app", "/app/:path*", "/login"],
};
