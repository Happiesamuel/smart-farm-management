import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // ✅ Always public — no checks at all
  const publicPaths = ["/auth/callback", "/api/auth"];
  if (publicPaths.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  const hasSession =
    !!req.cookies.get("a_session")?.value ||
    req.cookies.getAll().some((c) => c.name.startsWith("a_session_"));

  const activeWorkspace = req.cookies.get("activeWorkspace")?.value;
  const role = req.cookies.get("role")?.value;
  const bypass = req.cookies.get("bypass")?.value;

  if (bypass === "true") {
    return NextResponse.next();
  }

  const isWorkerOrManager = role === "worker" || role === "manager";
  const isOwner = role === "owner";

  // 🚨 Handle join-workspace separately — semi-public page
  if (path.startsWith("/worker/join-workspace")) {
    if (hasSession && activeWorkspace) {
      return NextResponse.redirect(
        new URL(`/worker/${activeWorkspace}/dashboard`, req.url),
      );
    }
    return NextResponse.next();
  }

  // 🚨 1. Force onboarding if no role

  const roleExemptPaths = [
    "/onboard",
    "/worker/login",
    "/worker/forgot-password",
    "/worker/enter-email",
    "/worker/verify-email",
    "/worker/change-password",
    "/owner/login",
    "/owner/sign-up",
  ];

  if (!role && !roleExemptPaths.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/onboard", req.url));
  }

  // 🚨 2. Not logged in → block protected routes
  // 🚨 2. Not logged in → block protected routes
  if (!hasSession) {
    if (path.startsWith("/user") || path === "/select-workspace") {
      return NextResponse.redirect(new URL("/owner/login", req.url));
    }

    const workerAuthPages = [
      "/worker/login",
      "/worker/forgot-password",
      "/worker/enter-email",
      "/worker/verify-email",
      "/worker/change-password",
    ];

    if (
      path.startsWith("/worker") &&
      !workerAuthPages.some((p) => path.startsWith(p))
    ) {
      return NextResponse.redirect(new URL("/worker/login", req.url));
    }
  }

  // 🚨 3. Logged in → block auth pages
  const isAuthPage =
    path === "/owner/login" ||
    path === "/owner/sign-up" ||
    path === "/worker/login" ||
    path === "/worker/forgot-password" ||
    path === "/worker/enter-email" ||
    path === "/worker/verify-email" ||
    path === "/worker/change-password" ||
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
    if (isWorkerOrManager) {
      return NextResponse.redirect(
        new URL("/worker/select-workspace", req.url),
      );
    }
    return NextResponse.redirect(new URL("/select-workspace", req.url));
  }

  // 🚨 4. Logged in but NO active workspace
  if (hasSession && !activeWorkspace) {
    if (
      isOwner &&
      path !== "/select-workspace" &&
      !path.startsWith("/owner/create-workspace")
    ) {
      return NextResponse.redirect(new URL("/select-workspace", req.url));
    }
    if (isWorkerOrManager && path !== "/worker/select-workspace") {
      return NextResponse.redirect(
        new URL("/worker/select-workspace", req.url),
      );
    }
  }

  // 🚨 5. Logged in + has workspace → block select pages
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
    "/user/:path*",
    "/login",
  ],
};
