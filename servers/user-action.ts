"use server";

import { ID, Query } from "appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";
import { User } from "@/lib/types";

export const createUser = async (obj: User) => {
  try {
    const { database } = await createAdminClient();
    const document = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      obj,
    );
    return {
      userId: document.$id,
      email: document.email,
      fullName: document.name,
      avatar: document.avatarUrl,
      isVerified: true,
      phone: document.phone,
      password: document.password,
      id: document.$id,
    };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to create user",
    );
  }
};
export const updateUser = async (
  obj: Record<string, string>,
  userId: string,
) => {
  try {
    const { database } = await createAdminClient();
    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      obj,
    );
    return { update: true };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to update user",
    );
  }
};

export async function getCurrentUser() {
  try {
    const { account } = await createSessionClient();
    const session = await account.get();
    return {
      id: session.$id,
      email: session.email,
      name: session.name,
    };
  } catch (err) {
    console.log(err);
    return null; // ✅ don't throw, return null
  }
}

export async function getGuestById(userId: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", userId!)],
    );
    if (result.documents.length === 0) {
      return null;
    }
    const doc = result.documents[0];
    return {
      id: doc.$id,
      fullName: doc.fullName,
      email: doc.email,
      avatar: doc.avatar,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getGuestByEmail(email: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("email", email!)],
    );
    if (result.documents.length === 0) {
      throw new Error("User not found");
    }
    const doc = result.documents[0];
    return {
      id: doc.$id,
      fullName: doc.fullName,
      email: doc.email,
      avatar: doc.avatar,
      password: doc.password,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
