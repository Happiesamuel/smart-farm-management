"use server";

import { ID, Query } from "appwrite";
import { appwriteConfig } from "./appwrite-client";
import { createAdminClient } from "./appwrite";
import {
  CropInfo,
  ExpenseInfo,
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
    CropInfo | FieldInfo | HarvestInfo | TaskInfo | SalesInfo | ExpenseInfo,
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
export const getDoc = async ({ collection, id, workspaceId, userId }: any) => {
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
export const getDocs = async ({ collection, workspaceId, userId }: any) => {
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();

  const res = await database.listDocuments(
    appwriteConfig.databaseId,
    collection,
    [Query.equal("workspaces", workspaceId)],
  );

  return res.documents;
};
export const updateDoc = async ({
  collection,
  id,
  data,
  workspaceId,
  userId,
}: any) => {
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
}: any) => {
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
}: any) => {
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  return await database.deleteDocument(
    appwriteConfig.databaseId,
    collection,
    id,
  );
};
