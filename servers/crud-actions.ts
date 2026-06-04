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
import { uploadImage } from "@/lib/functions";

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
  let newData;
  if (collection === "fields") {
    const a = await img(data as Omit<FieldInfo, "id" | "workspaces" | "users">);
    newData = { ...data, ...a };
  } else {
    newData = { ...data };
  }
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  const a = await database.createDocument(
    appwriteConfig.databaseId,
    collection,
    ID.unique(),
    {
      ...newData,
      workspaces: workspaceId,
      users: userId,
    },
  );
  return {
    id: a.$id,
  };
};
export async function img(obj: Omit<FieldInfo, "id" | "workspaces" | "users">) {
  const incl = Object.keys(obj).includes("fieldImage");

  const { avatar } = await createAdminClient();
  let lnk: string = "";
  if (incl) {
    const uploaded = await uploadImage(obj.fieldImage as unknown as File);
    lnk = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}&mode=admin`;
  } else {
    lnk = avatar.getInitials({
      name: obj.fieldName,
    });
  }
  return { fieldImage: lnk };
}
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
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  const res = await database.listDocuments(
    appwriteConfig.databaseId,
    collection,
    [Query.equal("workspaces", workspaceId), Query.equal("farms", farmId)],
  );
  return res.documents.map((d) => {
    return { ...d };
  });
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
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  const res = await database.listDocuments(
    appwriteConfig.databaseId,
    collection,
    [Query.equal("workspaces", workspaceId)],
  );
  return res.documents.map((d) => {
    return { ...d };
  });
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
