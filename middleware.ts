import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const session = req.cookies.get("appwrite-session")?.value;
//   const activeWorkspace = req.cookies.get("activeWorkspace")?.value;
//   const role = req.cookies.get("role")?.value;

//   const url = req.nextUrl;
//   const path = url.pathname;

//   const bypass = req.cookies.get("bypass")?.value;

//   if (bypass === "true") {
//     return NextResponse.next();
//   }

//   // 🚫 No role → force onboard
//   if (!role && path !== "/onboard") {
//     return NextResponse.redirect(new URL("/onboard", req.url));
//   }

//   // 🚫 Logged in → block onboard & login
//   if (
//     session &&
//     (path === "/onboard" ||
//       path.includes("/login") ||
//       path.includes("/sign-up") ||
//       path.includes("/owner"))
//   ) {
//     if (activeWorkspace) {
//       return NextResponse.redirect(
//         new URL(`/user/${activeWorkspace}/dashboard`, req.url),
//       );
//     }

//     return NextResponse.redirect(new URL("/select-workspace", req.url));
//   }

//   // 🚫 Not logged in → block protected routes
//   if (!session && path.startsWith("/user")) {
//     return NextResponse.redirect(new URL("/onboard", req.url));
//   }

//   // 🚫 Logged in but no workspace
//   if (session && !activeWorkspace && path.startsWith("/user")) {
//     return NextResponse.redirect(new URL("/select-workspace", req.url));
//   }

//   // 🚀 Has workspace → skip select page
//   if (session && activeWorkspace && path === "/select-workspace") {
//     return NextResponse.redirect(
//       new URL(`/user/${activeWorkspace}/dashboard`, req.url),
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/onboard",
//     "/owner/login",
//     "/worker/login",
//     "/owner/:path*",
//     "/owner/sign-up",
//     "/select-workspace",
//     "/user/:path*",
//   ],
// };

export function middleware(req: NextRequest) {
  const session = req.cookies.get("appwrite-session")?.value;
  const activeWorkspace = req.cookies.get("activeWorkspace")?.value;
  const role = req.cookies.get("role")?.value;
  const bypass = req.cookies.get("bypass")?.value;
  const path = req.nextUrl.pathname;
  if (bypass === "true") {
    return NextResponse.next();
  }
  // 🚨 1. Force onboarding if no role
  if (!role && path !== "/onboard") {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🚨 2. Not logged in → block ALL protected routes
  if (!session) {
    if (path.startsWith("/user") || path === "/select-workspace") {
      return NextResponse.redirect(new URL("/owner/login", req.url));
    }
  }

  // 🚨 3. Logged in → block auth pages (login / signup / onboard)
  const isAuthPage =
    path === "/owner/login" ||
    path === "/owner/sign-up" ||
    path.startsWith("/login") ||
    path === "/onboard";

  if (session && isAuthPage) {
    if (activeWorkspace) {
      return NextResponse.redirect(
        new URL(`/user/${activeWorkspace}/dashboard`, req.url),
      );
    }

    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  // 🚨 4. Logged in but NO workspace → force select workspace
  if (session && !activeWorkspace && path.startsWith("/user")) {
    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  // 🚨 5. Logged in + workspace → block select workspace page
  if (session && activeWorkspace && path === "/select-workspace") {
    return NextResponse.redirect(
      new URL(`/user/${activeWorkspace}/dashboard`, req.url),
    );
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/onboard", "/owner/:path*", "/select-workspace", "/user/:path*"],
};
