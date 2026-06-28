import { createAdminClient } from "@/servers/appwrite";
import { appwriteConfig } from "@/servers/appwrite-client";
import { createUser, getGuestById } from "@/servers/user-action";
import { getWorkspace } from "@/servers/workspace-action";
import { Account, Client } from "appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) throw new Error("Missing userId or secret");

    const { account, avatar } = await createAdminClient();

    // ✅ Exchange token for real session — secret is fully accessible here
    const session = await account.createSession(userId, secret);

    const cookieStore = await cookies();

    // ✅ Set exactly like email/password login
    cookieStore.set("a_session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    const sessionClient = new Client()
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId)
      .setSession(session.secret);

    const sessionAccount = new Account(sessionClient);
    const user = await sessionAccount.get();

    const res = await getGuestById(user.$id);
    let guest = res?.data

    if (!guest) {
      const avatarUrl = avatar.getInitials({
        name: user.name,
        width: 200,
        height: 200,
        background: "2e7d32",
      });

      const res = await createUser({
        userId: user.$id,
        email: user.email,
        fullName: user.name,
        avatar: avatarUrl,
        isVerified: true,
        phone: "",
        password: "hs_password",
        lastSeen: new Date().toISOString(),
      });
      guest = res?.data
    }
    const {data:workspace} = await getWorkspace(guest!.id);

    if (!workspace || workspace.length === 0) {
      cookieStore.set("guestId", guest!.id, {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      return NextResponse.redirect(new URL("/owner/create-workspace", req.url));
    }

    return NextResponse.redirect(new URL("/select-workspace", req.url));
  } catch (error) {
    console.error("AUTH CALLBACK ERROR:", error);
    return NextResponse.redirect(new URL("/owner/login", req.url));
  }
}
