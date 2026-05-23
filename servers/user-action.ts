"use server";

import { ID } from "appwrite";
import { createAdminClient } from "./appwrite";
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
