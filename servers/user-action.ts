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
    return document;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to create user",
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
    throw new Error(err instanceof Error ? err.message : "Unknown error");
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
      throw new Error("User not found");
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
