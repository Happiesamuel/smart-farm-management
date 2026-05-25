import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("appwrite-session")?.value;
  const activeWorkspace = req.cookies.get("activeWorkspace")?.value;
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl;

  // 🚫 Not logged in but trying to access protected routes
  if (!session && url.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🚫 No role selected → force onboard first
  if (!role && url.pathname !== "/onboard") {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🔐 Logged in → block login pages
  if (session && url.pathname.includes("/login")) {
    if (activeWorkspace) {
      return NextResponse.redirect(
        new URL(`/user/${activeWorkspace}/dashboard`, req.url),
      );
    }
    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  // 📌 Logged in but no workspace
  if (session && !activeWorkspace && url.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/login", "/select-workspace", "/user/:path*"],
};
