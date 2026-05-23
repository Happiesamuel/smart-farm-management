"use server";

import { ID, Query } from "appwrite";
import { createAdminClient } from "./appwrite";
import { UserObj, WorkspaceObj } from "@/lib/types";
import { createUser } from "./user-action";
import { sendOtp } from "@/lib/otp";
import { createOtp } from "./email-actions";
import { appwriteConfig } from "./appwrite-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export async function createManagerUser(obj: UserObj) {
  try {
    const { account, avatar } = await createAdminClient();
    const avatarUrl = avatar.getInitials({
      name: obj.fullName,
      width: 200,
      height: 200,
      background: "2e7d32",
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

    const guest = await createUser(userObj);

    const otp = await sendOtp(guest.email);
    await createOtp(otp, guest.$id);

    return {
      id: guest.$id,
      email: guest.email,
      name: guest.name,
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
