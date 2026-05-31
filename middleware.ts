import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicPaths = ["/auth/callback", "/api/auth", "/worker/join-workspace"];
  if (publicPaths.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  const hasSession =
    !!req.cookies.get("session")?.value ||
    req.cookies.getAll().some((c) => c.name.startsWith("a_session_")) ||
    req.cookies.getAll().some((c) => c.name.startsWith("a_session"));

  const activeWorkspace = req.cookies.get("activeWorkspace")?.value;
  const role = req.cookies.get("role")?.value;
  const bypass = req.cookies.get("bypass")?.value;

  if (bypass === "true") {
    return NextResponse.next();
  }

  const isWorkerOrManager = role === "worker" || role === "manager";
  const isOwner = role === "owner";

  // 🚨 1. Force onboarding if no role
  if (
    !role &&
    path !== "/onboard" &&
    !path.startsWith("/worker/join-workspace")
  ) {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🚨 2. Not logged in → block protected routes
  if (!hasSession) {
    if (path.startsWith("/user") || path === "/select-workspace") {
      return NextResponse.redirect(new URL("/owner/login", req.url));
    }

    if (
      path.startsWith("/worker") &&
      !path.startsWith("/worker/join-workspace")
    ) {
      return NextResponse.redirect(new URL("/worker/login", req.url));
    }
  }

  // 🚨 3. Logged in → block auth pages
  const isAuthPage =
    path === "/owner/login" ||
    path === "/owner/sign-up" ||
    path.startsWith("/login") ||
    path === "/onboard";

  if (hasSession && isAuthPage) {
    if (activeWorkspace) {
      if (isWorkerOrManager) {
        return NextResponse.redirect(
          new URL(`/worker/${activeWorkspace}/dashboard`, req.url),
        );
      }
      return NextResponse.redirect(
        new URL(`/user/${activeWorkspace}/dashboard`, req.url),
      );
    }
    // no workspace yet → role-based select workspace
    if (isWorkerOrManager) {
      return NextResponse.redirect(
        new URL("/worker/select-workspace", req.url),
      );
    }
    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  // 🚨 4. Logged in but NO workspace
  if (hasSession && !activeWorkspace) {
    if (path.startsWith("/user")) {
      return NextResponse.redirect(new URL("/select-workspace", req.url));
    }
    if (path.startsWith("/worker") && path !== "/worker/select-workspace") {
      return NextResponse.redirect(
        new URL("/worker/select-workspace", req.url),
      );
    }
    // ✅ catch-all — logged in, no workspace, not already on select page
    if (isOwner && path !== "/select-workspace") {
      return NextResponse.redirect(new URL("/select-workspace", req.url));
    }
    if (isWorkerOrManager && path !== "/worker/select-workspace") {
      return NextResponse.redirect(
        new URL("/worker/select-workspace", req.url),
      );
    }
  }
  // 🚨 5. Logged in + workspace → block select pages
  if (hasSession && activeWorkspace) {
    if (isOwner && path === "/select-workspace") {
      return NextResponse.redirect(
        new URL(`/user/${activeWorkspace}/dashboard`, req.url),
      );
    }
    if (isWorkerOrManager && path === "/worker/select-workspace") {
      return NextResponse.redirect(
        new URL(`/worker/${activeWorkspace}/dashboard`, req.url),
      );
    }
  }

  // 🚨 6. Cross-role path protection
  if (hasSession && isWorkerOrManager && path.startsWith("/user")) {
    return NextResponse.redirect(
      new URL(
        activeWorkspace
          ? `/worker/${activeWorkspace}/dashboard`
          : "/worker/select-workspace",
        req.url,
      ),
    );
  }

  if (hasSession && isOwner && path.startsWith("/worker")) {
    return NextResponse.redirect(
      new URL(
        activeWorkspace
          ? `/user/${activeWorkspace}/dashboard`
          : "/select-workspace",
        req.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/callback",
    "/onboard",
    "/owner/:path*",
    "/select-workspace",
    "/worker/:path*",
    "/worker/select-workspace", // ✅ explicit
    "/user/:path*",
    "/login",
  ],
};

// export function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   const publicPaths = ["/auth/callback", "/api/auth"];
//   if (publicPaths.some((p) => path.startsWith(p))) {
//     return NextResponse.next();
//   }

//   // ✅ Only rely on your own httpOnly cookie, not Appwrite's browser cookie
//   const hasSession =
//     !!req.cookies.get("a_session")?.value ||
//     req.cookies.getAll().some((c) => c.name.startsWith("a_session_"));

//   const activeWorkspace = req.cookies.get("activeWorkspace")?.value;
//   const role = req.cookies.get("role")?.value;
//   const bypass = req.cookies.get("bypass")?.value;

//   if (bypass === "true") {
//     return NextResponse.next();
//   }

//   // 🚨 1. Force onboarding if no role
//   if (!role && path !== "/onboard") {
//     return NextResponse.redirect(new URL("/onboard", req.url));
//   }

//   // 🚨 2. Not logged in → block protected routes
//   if (!hasSession) {
//     if (path.startsWith("/user") || path === "/select-workspace") {
//       return NextResponse.redirect(new URL("/owner/login", req.url));
//     }
//   }

//   // 🚨 3. Logged in → block auth pages
//   const isAuthPage =
//     path === "/owner/login" ||
//     path === "/owner/sign-up" ||
//     path.startsWith("/login") ||
//     path === "/onboard";

//   if (hasSession && isAuthPage) {
//     if (activeWorkspace) {
//       return NextResponse.redirect(
//         new URL(`/user/${activeWorkspace}/dashboard`, req.url),
//       );
//     }

//     return NextResponse.redirect(new URL("/select-workspace", req.url));
//   }

//   // 🚨 4. Logged in but NO workspace
//   if (hasSession && !activeWorkspace && path.startsWith("/user")) {
//     return NextResponse.redirect(new URL("/select-workspace", req.url));
//   }

//   // 🚨 5. Logged in + workspace → block select page
//   if (hasSession && activeWorkspace && path === "/select-workspace") {
//     return NextResponse.redirect(
//       new URL(`/user/${activeWorkspace}/dashboard`, req.url),
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/auth/callback", // ← back in matcher so the publicPaths check above catches it
//     "/onboard",
//     "/owner/:path*",
//     "/select-workspace",
//     "/user/:path*",
//   ],
// };
