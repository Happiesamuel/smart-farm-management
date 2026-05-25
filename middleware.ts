import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("appwrite-session")?.value;
  const activeWorkspace = req.cookies.get("activeWorkspace")?.value;
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl;
  const path = url.pathname;

  // 🚫 No role → force onboard
  if (!role && path !== "/onboard") {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🚫 Logged in → block onboard & login
  if (session && (path === "/onboard" || path.includes("/login"))) {
    if (activeWorkspace) {
      return NextResponse.redirect(
        new URL(`/user/${activeWorkspace}/dashboard`, req.url),
      );
    }

    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  // 🚫 Not logged in → block protected routes
  if (!session && path.startsWith("/user")) {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🚫 Logged in but no workspace
  if (session && !activeWorkspace && path.startsWith("/user")) {
    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  // 🚀 Has workspace → skip select page
  if (session && activeWorkspace && path === "/select-workspace") {
    return NextResponse.redirect(
      new URL(`/user/${activeWorkspace}/dashboard`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/onboard",
    "/owner/login",
    "/user/login",
    "/select-workspace",
    "/user/:path*",
  ],
};
