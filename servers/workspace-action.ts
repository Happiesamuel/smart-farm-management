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

    if (result.documents.length === 0) return { success: true, data: null };

    return {
      success: true,
      data: result.documents.map((doc) => ({
        id: doc.$id,
        name: doc.name,
        inviteCode: doc.inviteCode,
        workspaceId: doc.workspaceId,
      })),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
}

export const checkUserInWorkspace = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  try {
    const { database } = await createAdminClient();
    const existing = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      [Query.equal("users", userId), Query.equal("workspaces", workspaceId)],
    );
    return { success: true, data: existing.total > 0 };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export async function getWorkspaceByWorkspaceId(workspaceId: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      [Query.equal("$id", workspaceId!)],
    );

    if (result.documents.length === 0) return { success: true, data: null };

    const doc = result.documents[0];
    return {
      success: true,
      data: {
        id: doc.$id,
        name: doc.name,
        inviteCode: doc.inviteCode,
        workspaceId: doc.workspaceId,
      },
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
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

    if (result.documents.length === 0) return { success: true, data: null };

    return {
      success: true,
      data: result.documents.map((doc) => ({
        id: doc.$id,
        users: doc.users,
        workspaces: doc.workspaces,
        role: doc.role,
        joinedAt: doc.joinedAt,
      })),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
}

export const getWorkspaceMembers = async (workspaceId: string) => {
  try {
    const { database } = await createAdminClient();
    const members = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      [Query.equal("workspaces", workspaceId)],
    );

    return {
      success: true,
      data: members.documents.map((x) => ({
        role: x.role,
        users: x.users,
        workspaces: x.workspaces,
        id: x.$id,
      })),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getUserWorkspacesWithRole = async ({
  userId,
  role,
}: {
  userId: string;
  role: "owner" | "worker";
}) => {
  try {
    const { database } = await createAdminClient();

    const memberships = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      [Query.equal("users", userId), Query.equal("role", role)],
    );

    if (!memberships.documents.length) return { success: true, data: [] };

    const workspaceIds = memberships.documents.map((m) => m.workspaces);
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceCollectionId,
      [Query.equal("$id", workspaceIds)],
    );

    const membershipMap = new Map(
      memberships.documents.map((m) => [m.workspaces, m]),
    );

    return {
      success: true,
      data: documents.map((doc) => {
        const member = membershipMap.get(doc.$id);
        return {
          id: doc.$id,
          name: doc.name,
          users: doc.user,
          workspaceId: doc.workspaceId,
          inviteCode: doc.inviteCode,
          createdAt: doc.$createdAt,
          role,
          memberId: member?.$id,
        };
      }),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getWorkspaceAssignOptions = async (workspaceId: string) => {
  try {
    const { database } = await createAdminClient();

    const membersRes = await database.listDocuments(
      appwriteConfig.databaseId,
      "workspaceMembers",
      [Query.equal("workspaces", workspaceId)],
    );

    const userIds = membersRes.documents.map((m) => m.users);
    if (!userIds.length) return { success: true, data: [] };

    const usersRes = await database.listDocuments(
      appwriteConfig.databaseId,
      "users",
      [Query.equal("$id", userIds)],
    );

    return {
      success: true,
      data: membersRes.documents.map((m) => {
        const user = usersRes.documents.find((u) => u.$id === m.users);
        return {
          name: user?.fullName ?? "Unknown User",
          value: user?.$id ?? "",
          role: m.role,
        };
      }),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getWorkspaceUser = async (workspaceId: string) => {
  try {
    const { database } = await createAdminClient();

    const membersRes = await database.listDocuments(
      appwriteConfig.databaseId,
      "workspaceMembers",
      [Query.equal("workspaces", workspaceId)],
    );

    const userIds = membersRes.documents.map((m) => m.users);
    if (!userIds.length) return { success: true, data: [] };

    const usersRes = await database.listDocuments(
      appwriteConfig.databaseId,
      "users",
      [Query.equal("$id", userIds)],
    );

    return {
      success: true,
      data: membersRes.documents.map((m) => {
        const user = usersRes.documents.find((u) => u.$id === m.users);
        return {
          name: user?.fullName ?? "Unknown User",
          id: user?.$id ?? "",
          avatar: user?.avatar ?? "",
          email: user?.email ?? "",
          role: m.role,
          mId: m.$id,
          lastSeen: user?.lastSeen ?? "",
        };
      }),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const updateLastSeen = async (userId: string) => {
  try {
    const { database } = await createAdminClient();
    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      { lastSeen: new Date().toISOString() },
    );
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const removeWorkspaceMember = async (memberId: string) => {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      memberId,
    );
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const updateWorkspaceMemberRole = async ({
  memberId,
  role,
}: {
  memberId: string;
  role: "owner" | "manager" | "worker";
}) => {
  try {
    const { database } = await createAdminClient();
    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      memberId,
      { role },
    );
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};