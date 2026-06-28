"use server";

import { ID, OAuthProvider, Query } from "appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";
import {
  UserObj,
  UserObjId,
  WorkspaceMemberObj,
  WorkspaceObj,
  WorkspaceObjId,
} from "@/lib/types";
import { createUser, getGuestByEmail } from "./user-action";
import { inviteUser, sendOtp } from "@/lib/otp";
import { createOtp } from "./email-actions";
import { appwriteConfig } from "./appwrite-client";
import { cookies } from "next/headers";
import { checkUserInWorkspace } from "./workspace-action";

export const loginWithGoogle = async () => {
  const { account } = await createAdminClient();

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    `${process.env.NEXT_PUBLIC_APP_URL}/owner/login`,
  );

  return { url: redirectUrl };
};
export const login = async (email: string, password: string) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);
    const cookieStore = await cookies();

    cookieStore.set("a_session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return {
      success:true,
      data: {
      id: session.$id,
      secret: session.secret,
    }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
}
}

export const logout = async () => {
  const cookieStore = await cookies();

  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");

    cookieStore
      .getAll()
      .filter((c) => c.name.startsWith("a_session"))
      .forEach((c) => cookieStore.delete(c.name));
    cookieStore.delete("session");
    cookieStore.delete("activeWorkspace");
    cookieStore.delete("role");

    return { success: true };
  } catch (err) {
    
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
};
export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const { account } = await createSessionClient();
    await account.updatePassword(newPassword, oldPassword);
    return { success: true };
  } catch (error) {
    console.error("Password change error:", error);
    throw error;
  }
};

export async function createManagerUser(obj: UserObj) {
  try {
    const { account, avatar } = await createAdminClient();
    const avatarUrl = avatar.getInitials({
      name: obj.fullName,
      width: 200,
      height: 200,
    });

    const user = await account.create(
      ID.unique(),
      obj.email,
      obj.password,
      obj.fullName,
    );

    const userObj = {
      ...obj,
      userId: user.$id,
      avatar: avatarUrl,
      isVerified: false,
    };

    const guest = (await createUser(userObj)) as UserObjId;

    const otp = await sendOtp(guest.email);
    await createOtp(otp, guest.id);

    return {
      id: guest.id,
      email: guest.email,
      name: guest.fullName,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function createWorkerUser(
  obj: UserObj,
  work: Omit<WorkspaceObjId, "users" | "workspaceId">,
) {
  try {
    const { account, avatar } = await createAdminClient();

    // ✅ STEP 1: CHECK IF USER EXISTS
    const existingUser = await getGuestByEmail(obj.email);

    if (existingUser) {
      // ✅ STEP 2: CHECK IF ALREADY IN WORKSPACE
      const alreadyJoined = await checkUserInWorkspace({
        userId: existingUser.id,
        workspaceId: work.id,
      });

      if (alreadyJoined) {
        throw new Error("User already belongs to this workspace");
      }

      // ✅ SEND INVITE ONLY
      await inviteUser(
        existingUser.email,
        existingUser.fullName,
        work.name,
        `${appwriteConfig.appUrl}/worker/join-workspace/${work.id}/${work.inviteCode}-${existingUser.id}-xyz`,
      );

      return {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.fullName,
      };
    }

    // ✅ STEP 3: CREATE NEW USER
    const avatarUrl = avatar.getInitials({
      name: obj.fullName,
      width: 200,
      height: 200,
    });

    const user = await account.create(
      ID.unique(),
      obj.email,
      obj.password,
      obj.fullName,
    );

    const userObj = {
      ...obj,
      userId: user.$id,
      avatar: avatarUrl,
      isVerified: true,
    };

    const guest = (await createUser(userObj)) as UserObjId;

    // ✅ STEP 4: SEND INVITE
    await inviteUser(
      guest.email,
      guest.fullName,
      work.name,
      `${appwriteConfig.appUrl}/worker/join-workspace/${work.id}/${work.inviteCode}-${guest.id}-abc`,
    );

    return {
      id: guest.id,
      email: guest.email,
      name: guest.fullName,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function createWorkspace(slug: string, obj: WorkspaceObj) {
  try {
    const { database } = await createAdminClient();
    const existing = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      [Query.equal("workspaceId", slug)],
    );

    if (existing.documents.length > 0) {
      throw new Error("Workspace ID already taken");
    }

    const data = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      ID.unique(),
      obj,
    );

    return { id: data.$id };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

export async function createWorkspaceMember(obj: WorkspaceMemberObj) {
  try {
    const { database } = await createAdminClient();
    const data = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      ID.unique(),
      obj,
    );

    return { id: data.$id };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

export async function validateOTP(userId: string, otp: string) {
  const { database } = await createAdminClient();
  const result = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.otpCollectionId,
    [
      Query.equal("users.$id", userId),
      Query.equal("otpCode", otp),
      Query.equal("isUsed", false),
    ],
  );
  if (result.documents.length === 0) {
    throw new Error("OTP may be invalid or expired");
  }

  const otpDoc = result.documents[0];

  if (new Date(otpDoc.expirationTime) < new Date()) {
    throw new Error("OTP expired");
  }

  await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.otpCollectionId,
    otpDoc.$id,
    {
      isUsed: true,
    },
  );
  await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId,
    {
      isVerified: true,
    },
  );

  return { success: true, message: "OTP verified" };
}

export const recreateOtp = async (email: string, userId: string) => {
  try {
    const otp = await sendOtp(email);
    await createOtp(otp, userId);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to resend OTP",
    );
  }
};

type SetupUserParams = {
  email: string;
  oldPassword: string;
  newPassword: string;
  fullName: string;
};

export async function setupUserSessionAndProfile({
  email,
  oldPassword,
  newPassword,
  fullName,
}: SetupUserParams) {
  try {
    await login(email, oldPassword);

    const { account } = await createSessionClient();

    if (fullName) {
      await account.updateName(fullName);
    }

    if (newPassword && oldPassword !== newPassword) {
      await account.updatePassword(newPassword, oldPassword);
    }

    return true;
  } catch (error) {
    console.error("SETUP PROFILE ERROR:", error);
    throw error;
  }
}
