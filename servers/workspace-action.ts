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
  role,
}: {
  userId: string;
  role: "owner" | "worker";
}) => {
  const { database } = await createAdminClient();

  // 🔥 FILTER BY ROLE HERE
  const memberships = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceMembersCollectionId,
    [
      Query.equal("users", userId),
      Query.equal("role", role), // ✅ KEY LINE
    ],
  );

  if (!memberships.documents.length) return [];

  const workspaceIds = memberships.documents.map((m) => m.workspaces);

  const { documents } = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceCollectionId,
    [Query.equal("$id", workspaceIds)],
  );

  return documents.map((doc) => ({
    id: doc.$id,
    name: doc.name,
    users: doc.user,
    workspaceId: doc.workspaceId,
    inviteCode: doc.inviteCode,
    createdAt: doc.$createdAt,
    role, // ✅ already known, no need to find again
  }));
};
// export const getUserWorkspacesWithRole = async ({
//   userId,
// }: {
//   userId: string;
// }) => {
//   const { database } = await createAdminClient();
//   const memberships = await database.listDocuments(
//     appwriteConfig.databaseId,
//     appwriteConfig.workspaceMembersCollectionId,
//     [Query.equal("users", userId)],
//   );

//   const workspaceIds = memberships.documents.map((m) => m.workspaces);

//   if (workspaceIds.length === 0) return [];

//   const { documents } = await database.listDocuments(
//     appwriteConfig.databaseId,
//     appwriteConfig.workspaceCollectionId,
//     [Query.equal("$id", workspaceIds)],
//   );
//   const newWork = documents.map((doc) => {
//     return {
//       id: doc.$id,
//       name: doc.name,
//       users: doc.user,
//       workspaceId: doc.workspaceId,
//       inviteCode: doc.inviteCode,
//       createdAt: doc.$createdAt,
//     };
//   });

//   return newWork.map((ws) => {
//     const member = memberships.documents.find((m) => m.workspaces === ws.id);

//     return {
//       ...ws,
//       role: member?.role,
//     };
//   });
// };

export const getWorkspaceAssignOptions = async (workspaceId: string) => {
  const { database } = await createAdminClient();

  const membersRes = await database.listDocuments(
    appwriteConfig.databaseId,
    "workspaceMembers",
    [Query.equal("workspaces", workspaceId)],
  );

  const members = membersRes.documents;

  const userIds = members.map((m) => m.users);

  if (!userIds.length) return [];

  const usersRes = await database.listDocuments(
    appwriteConfig.databaseId,
    "users",
    [Query.equal("$id", userIds)],
  );

  const users = usersRes.documents;

  // 🔥 RETURN PLAIN DATA ONLY
  return members.map((m) => {
    const user = users.find((u) => u.$id === m.users);

    return {
      name: user?.fullName ?? "Unknown User",
      value: user?.$id ?? "",
      role: m.role,
    };
  });
};
export const getWorkspaceUser = async (workspaceId: string) => {
  const { database } = await createAdminClient();

  const membersRes = await database.listDocuments(
    appwriteConfig.databaseId,
    "workspaceMembers",
    [Query.equal("workspaces", workspaceId)],
  );

  const members = membersRes.documents;

  const userIds = members.map((m) => m.users);

  if (!userIds.length) return [];

  const usersRes = await database.listDocuments(
    appwriteConfig.databaseId,
    "users",
    [Query.equal("$id", userIds)],
  );

  const users = usersRes.documents;

  // 🔥 RETURN PLAIN DATA ONLY
  return members.map((m) => {
    const user = users.find((u) => u.$id === m.users);

    return {
      name: user?.fullName ?? "Unknown User",
      id: user?.$id ?? "",
      avatar: user?.avatar ?? "",
      email: user?.email ?? "",
      role: m.role,
      lastSeen: user?.lastSeen ?? "",
    };
  });
};

export const updateLastSeen = async (userId: string) => {
  const { database } = await createAdminClient();

  await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId,
    {
      lastSeen: new Date().toISOString(),
    },
  );
};
