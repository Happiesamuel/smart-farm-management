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
      success: true,
      data: {
        userId: document.$id,
        email: document.email,
        fullName: document.name,
        avatar: document.avatarUrl,
        isVerified: true,
        phone: document.phone,
        password: document.password,
        id: document.$id,
        lastSeen: document.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to create user" };
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
      success: true,
      data: {
        fullName: x.fullName,
        phone: x.phone,
        email: x.email,
        password: x.password,
        id: x.$id,
        avatar: x.avatar,
        lastSeen: x.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to update user" };
  }
};

export const updateUserData = async (
  obj: Record<string, string | undefined>,
  userId: string,
) => {
  try {
    const { database, avatar } = await createAdminClient();

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
      success: true,
      data: {
        fullName: x.fullName,
        phone: x.phone,
        email: x.email,
        password: x.password,
        id: x.$id,
        avatar: x.avatar,
        lastSeen: x.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to update user" };
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
      success: true,
      data: {
        fullName: x.fullName,
        phone: x.phone,
        email: x.email,
        password: x.password,
        id: x.$id,
        avatar: x.avatar,
        lastSeen: x.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to update user" };
  }
};

export const uploadAvatarToStorage = async (formData: FormData) => {
  try {
    const { storage } = await createAdminClient();
    const file = formData.get("file") as File;
    const uploaded = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file,
    );
    const url = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}`;
    return { success: true, data: { url } };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to upload avatar" };
  }
};

export const deleteAvatarFromStorage = async (fileId: string) => {
  try {
    const { storage } = await createAdminClient();
    await storage.deleteFile(appwriteConfig.bucketId, fileId);
    return { success: true };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to delete avatar" };
  }
};

export const removeUserAvatar = async (userId: string, fullName: string) => {
  try {
    const { database, avatar, storage } = await createAdminClient();

    const currentUser = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
    );

    const match = currentUser.avatar?.match(/files\/([^/]+)\/view/);
    const fileId = match?.[1];
    if (fileId) await storage.deleteFile(appwriteConfig.bucketId, fileId);

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
      success: true,
      data: {
        fullName: x.fullName,
        phone: x.phone,
        email: x.email,
        password: x.password,
        id: x.$id,
        avatar: x.avatar,
        lastSeen: x.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to remove avatar" };
  }
};

export const updateName = async (fullName: string) => {
  try {
    const { account } = await createSessionClient();
    await account.updateName(fullName);
    return { success: true };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Failed to update name" };
  }
};

export async function getCurrentUser() {
  try {
    const { account } = await createSessionClient();
    const session = await account.get();
    return { id: session.$id, email: session.email, name: session.name };
  } catch {
    return null; // intentionally returns null — no session
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

    if (result.documents.length === 0) return { success: true, data: null };

    const doc = result.documents[0];
    return {
      success: true,
      data: {
        id: doc.$id,
        fullName: doc.fullName,
        email: doc.email,
        avatar: doc.avatar,
        phone: doc.phone,
        password: doc.password,
        lastSeen: doc.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
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

    if (result.documents.length === 0) return { success: true, data: null };

    const doc = result.documents[0];
    return {
      success: true,
      data: {
        id: doc.$id,
        fullName: doc.fullName,
        email: doc.email,
        avatar: doc.avatar,
        phone: doc.phone,
        password: doc.password,
        lastSeen: doc.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
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

    if (result.documents.length === 0) return { success: true, data: null };

    const doc = result.documents[0];
    return {
      success: true,
      data: {
        id: doc.$id,
        fullName: doc.fullName,
        email: doc.email,
        avatar: doc.avatar,
        password: doc.password,
        lastSeen: doc.lastSeen,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
  }
}
