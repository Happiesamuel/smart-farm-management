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

export const checkUserInWorkspace = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  const { database } = await createAdminClient();
  const existing = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceMembersCollectionId,
    [Query.equal("users", userId), Query.equal("workspaces", workspaceId)],
  );

  return existing.total > 0;
};

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

export const getWorkspaceMembers = async (workspaceId: string) => {
  const { database } = await createAdminClient();
  const members = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceMembersCollectionId,
    [Query.equal("workspaces", workspaceId)],
  );
  return members.documents.map((x) => {
    return {
      role: x.role,
      users: x.users,
      workspaces: x.workspaces,
      id: x.$id,
    };
  });
};

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

  const { documents } = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceCollectionId,
    [Query.equal("$id", workspaceIds)],
  );
  const newWork = documents.map((doc) => {
    return {
      id: doc.$id,
      name: doc.name,
      users: doc.user,
      workspaceId: doc.workspaceId,
      inviteCode: doc.inviteCode,
      createdAt: doc.$createdAt,
    };
  });

  return newWork.map((ws) => {
    const member = memberships.documents.find((m) => m.workspaces === ws.id);

    return {
      ...ws,
      role: member?.role,
    };
  });
};
