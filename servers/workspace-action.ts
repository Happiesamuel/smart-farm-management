"use server";

import { Query } from "appwrite";
import { createAdminClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";

export async function getWorkspace(userId: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      [Query.equal("users", userId!)],
    );

    if (result.documents.length === 0) {
      return null;
    }

    return result.documents.map((doc) => {
      return {
        id: doc.$id,
        name: doc.name,
        inviteCode: doc.inviteCode,
        workspaceId: doc.workspaceId,
      };
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getWorkspaceByWorkspaceId(
  workspaceId: string | undefined,
) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      [Query.equal("$id", workspaceId!)],
    );

    if (result.documents.length === 0) {
      return null;
    }
    return result.documents
      .map((doc) => {
        return {
          id: doc.$id,
          name: doc.name,
          inviteCode: doc.inviteCode,
          workspaceId: doc.workspaceId,
        };
      })
      .at(0);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getWorkspaceMembersWithWorkspaceId(
  workspaceId: string | undefined,
  userId: string,
) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      [Query.equal("workspaces", workspaceId!), Query.equal("users", userId!)],
    );

    if (result.documents.length === 0) {
      return null;
    }

    return result.documents.map((doc) => {
      return {
        id: doc.$id,
        users: doc.users,
        workspaces: doc.workspaces,
        role: doc.role,
        joinedAt: doc.joinedAt,
      };
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export const getUserWorkspacesWithRole = async ({
  userId,
}: {
  userId: string;
}) => {
  const { database } = await createAdminClient();
  const memberships = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceMembersCollectionId,
    [Query.equal("users", userId)],
  );

  const workspaceIds = memberships.documents.map((m) => m.workspaces);

  if (workspaceIds.length === 0) return [];

  const workspaces = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceCollectionId,
    [Query.equal("$id", workspaceIds)],
  );

  // merge role into workspace
  return workspaces.documents.map((ws) => {
    const member = memberships.documents.find((m) => m.workspaces === ws.$id);

    return {
      ...ws,
      role: member?.role,
    };
  });
};
