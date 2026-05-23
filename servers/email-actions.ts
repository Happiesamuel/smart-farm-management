"use server";

import { ID } from "appwrite";
import { createAdminClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";

export async function createOtp(code: string, userId: string) {
  const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
  const { database } = await createAdminClient();

  const response = await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.otpCollectionId,
    ID.unique(),
    {
      otpCode: code,
      expiredAt: expirationTime.toISOString(),
      isUsed: false,
      users: userId,
    },
  );
  return {
    message: "OTP sent",
    otp: code,
    success: true,
    document: response,
  };
}
