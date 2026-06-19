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
      lastSeen: document.lastSeen,
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
    const x = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      obj,
    );
    return {
      fullName: x.fullName,
      phone: x.phone,
      email: x.email,
      password: x.password,
      id: x.$id,
      avatar: x.avatar,
      lastSeen: x.lastSeen,
    };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to update user",
    );
  }
};
export const updateUserData = async (
  obj: Record<string, string | undefined>,
  userId: string,
) => {
  try {
    const { database, avatar } = await createAdminClient();

    // If fullName is being updated and avatar is initials-based, regenerate avatar
    if (
      obj.fullName &&
      obj.avatar?.startsWith(
        "https://fra.cloud.appwrite.io/v1/avatars/initials",
      )
    ) {
      const newAvatar = avatar.getInitials({
        name: obj.fullName,
        width: 200,
        height: 200,
      });
      obj.avatar = newAvatar.toString();
    }

    const x = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      obj,
    );

    return {
      fullName: x.fullName,
      phone: x.phone,
      email: x.email,
      password: x.password,
      id: x.$id,
      avatar: x.avatar,
      lastSeen: x.lastSeen,
    };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to update user",
    );
  }
};
export const updateUserAvatar = async (
  obj: Record<string, string | undefined>,
  userId: string,
) => {
  try {
    const { database } = await createAdminClient();

    const x = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      obj,
    );

    return {
      fullName: x.fullName,
      phone: x.phone,
      email: x.email,
      password: x.password,
      id: x.$id,
      avatar: x.avatar,
      lastSeen: x.lastSeen,
    };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to update user",
    );
  }
};

export const uploadAvatarToStorage = async (formData: FormData) => {
  try {
    const { storage } = await createAdminClient();
    const file = formData.get("file") as File;

    const uploaded = await storage.createFile(
      appwriteConfig.bucketId, // your bucket id
      ID.unique(),
      file,
    );

    const url = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}`;

    return { url };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to upload avatar",
    );
  }
};

export const deleteAvatarFromStorage = async (fileId: string) => {
  try {
    const { storage } = await createAdminClient();
    await storage.deleteFile(appwriteConfig.bucketId, fileId);
    return { success: true };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to delete avatar",
    );
  }
};

export const removeUserAvatar = async (userId: string, fullName: string) => {
  try {
    const { database, avatar, storage } = await createAdminClient();

    // Get current user to find existing file ID
    const currentUser = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
    );

    // Delete from storage if it's a real uploaded file
    const match = currentUser.avatar?.match(/files\/([^/]+)\/view/);
    const fileId = match?.[1];
    if (fileId) await storage.deleteFile(appwriteConfig.bucketId, fileId);

    // Generate initials avatar using Appwrite avatars
    const newAvatar = avatar.getInitials({
      name: fullName,
      width: 200,
      height: 200,
    });

    const x = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      { avatar: newAvatar.toString() },
    );

    return {
      fullName: x.fullName,
      phone: x.phone,
      email: x.email,
      password: x.password,
      id: x.$id,
      avatar: x.avatar,
      lastSeen: x.lastSeen,
    };
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to remove avatar",
    );
  }
};

export const updateName = async (fullName: string) => {
  try {
    const { account } = await createSessionClient();

    await account.updateName(fullName);

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
      phone: doc.phone,
      password: doc.password,
      lastSeen: doc.lastSeen,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getGuestByGuestId(userId: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("$id", userId!)],
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
      phone: doc.phone,
      password: doc.password,
      lastSeen: doc.lastSeen,
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
      return null;
    }
    const doc = result.documents[0];
    return {
      id: doc.$id,
      fullName: doc.fullName,
      email: doc.email,
      avatar: doc.avatar,
      password: doc.password,
      lastSeen: doc.lastSeen,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
