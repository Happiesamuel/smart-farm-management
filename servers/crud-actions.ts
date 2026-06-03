"use server";

import { ID, Query } from "appwrite";
import { appwriteConfig } from "./appwrite-client";
import { createAdminClient } from "./appwrite";
import {
  CropInfo,
  ExpenseInfo,
  FarmInfo,
  FieldInfo,
  HarvestInfo,
  SalesInfo,
  TaskInfo,
} from "@/lib/types";

export const validateWorkspaceAccess = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  const { database } = await createAdminClient();
  const res = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceMembersCollectionId,
    [Query.equal("users", userId), Query.equal("workspaces", workspaceId)],
  );

  if (res.total === 0) {
    throw new Error("Unauthorized");
  }
};

export const createDoc = async ({
  collection,
  data,
  workspaceId,
  userId,
}: {
  collection: string;
  workspaceId: string;
  userId: string;
  data: Omit<
    | CropInfo
    | FieldInfo
    | HarvestInfo
    | TaskInfo
    | SalesInfo
    | ExpenseInfo
    | FarmInfo,
    "id" | "workspaces" | "users"
  >;
}) => {
  console.log(collection, data, workspaceId, userId);
  //   await validateWorkspaceAccess({ userId, workspaceId });
  //   const { database } = await createAdminClient();
  //   return await database.createDocument(
  //     appwriteConfig.databaseId,
  //     collection,
  //     ID.unique(),
  //     {
  //       ...data,
  //       workspaces: workspaceId,
  //       users: userId,
  //     },
  //   );
};
//single
export const getDoc = async ({
  collection,
  id,
  workspaceId,
  userId,
}: {
  collection: string;
  workspaceId: string;
  userId: string;
  id: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();

  const doc = await database.getDocument(
    appwriteConfig.databaseId,
    collection,
    id,
  );

  if (doc.workspaceId !== workspaceId) {
    throw new Error("Access denied");
  }

  return doc;
};
export const getFarmDocs = async ({
  collection,
  workspaceId,
  userId,
  farmId,
}: {
  collection: string;
  workspaceId: string;
  userId: string;
  farmId: string;
}) => {
  console.log(collection, workspaceId, userId, farmId);
  //   await validateWorkspaceAccess({ userId, workspaceId });
  //   const { database } = await createAdminClient();
  //   const res = await database.listDocuments(
  //     appwriteConfig.databaseId,
  //     collection,
  //   [Query.equal("workspaces", workspaceId),Query.equal("farms", farmId)],
  //   );
  //   return res.documents;
};
export const getDocs = async ({
  collection,
  workspaceId,
  userId,
}: {
  collection: string;
  workspaceId: string;
  userId: string;
}) => {
  console.log(collection, workspaceId, userId);
  //   await validateWorkspaceAccess({ userId, workspaceId });
  //   const { database } = await createAdminClient();
  //   const res = await database.listDocuments(
  //     appwriteConfig.databaseId,
  //     collection,
  //     [Query.equal("workspaces", workspaceId)],
  //   );
  //   return res.documents;
};
export const updateDoc = async ({
  collection,
  id,
  data,
  workspaceId,
  userId,
}: {
  collection: string;
  id: string;
  data: Record<string, string>;
  workspaceId: string;
  userId: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  return await database.updateDocument(
    appwriteConfig.databaseId,
    collection,
    id,
    data,
  );
};
export const updateField = async ({
  collection,
  id,
  field,
  value,
  workspaceId,
  userId,
}: {
  collection: string;
  id: string;
  value: string;
  field: string;
  workspaceId: string;
  userId: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  return await database.updateDocument(
    appwriteConfig.databaseId,
    collection,
    id,
    {
      [field]: value,
    },
  );
};
export const deleteDoc = async ({
  collection,
  id,
  workspaceId,
  userId,
}: {
  collection: string;
  id: string;
  workspaceId: string;
  userId: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  return await database.deleteDocument(
    appwriteConfig.databaseId,
    collection,
    id,
  );
};
