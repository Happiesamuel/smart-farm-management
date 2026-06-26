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
  NoteInfo,
  SalesInfo,
  TaskInfo,
} from "@/lib/types";
import {
  buildActivityMessage,
  buildUpdateMessage,
  buildDeleteMessage,
  uploadImage,
} from "@/lib/functions";
import { getGuestByGuestId } from "./user-action";

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

const resolveFarmId = (collection: string, data: { [key: string]: string }) => {
  switch (collection) {
    case "fields":
    case "crops":
      return data.farms;

    case "tasks":
      return data.farms || null;
    case "notes":
      return data.farms || null;

    case "harvests":
      return data.farms; // or derive from crop if needed

    case "sales":
    case "expenses":
      return data.farms || null;

    case "farms":
      return data.$id;

    default:
      return null;
  }
};

const createSecondaryActivities = async ({
  collection,
  data,
  workspaceId,
  docId,
  creatorName,
}: {
  collection: string;
  workspaceId: string;
  docId: string;
  creatorName: string;
  data: Record<string, string>;
}) => {
  switch (collection) {
    case "tasks":
      if (data.assignTo) {
        await createActivity({
          workspaceId,
          userId: data.assignTo, // worker receives this activity
          farmId: data.farms,
          entityType: "assignment",
          entityId: docId,
          action: "assigned",
          message: `${creatorName} assigned you "${data.taskTitle}"`,
        });
      }
      break;

    default:
      break;
  }
};
export const createActivity = async ({
  workspaceId,
  userId,
  farmId,
  entityType,
  entityId,
  action,
  message,
}: {
  workspaceId: string;
  farmId?: string | null;
  userId: string | null;
  entityType: string;
  entityId: string;
  action: string;
  message: string;
}) => {
  const { database } = await createAdminClient();

  await database.createDocument(
    appwriteConfig.databaseId,
    "activities",
    ID.unique(),
    {
      workspaces: workspaceId,
      users: userId,
      farms: farmId,
      entityType,
      entityId,
      action,
      message,
    },
  );
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
    | FarmInfo
    | NoteInfo,
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

  const doc = await database.createDocument(
    appwriteConfig.databaseId,
    collection,
    ID.unique(),
    {
      ...newData,
      workspaces: workspaceId,
      users: userId,
    },
  );
  const creator = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId,
  );
  await createSecondaryActivities({
    collection,
    data: newData,
    workspaceId,
    docId: doc.$id,
    creatorName: creator.fullName,
  });
  await createActivity({
    workspaceId,
    userId,
    farmId: resolveFarmId(collection, newData),
    entityType: collection,
    entityId: doc.$id,
    action: "created",
    message: buildActivityMessage(collection, newData),
  });

  return {
    id: doc.$id,
  };
};
export async function updateFarm({
  id,
  data,
  workspaceId,
  userId,
  collection,
}: {
  id: string;
  data: Record<string, number | string | File>;
  workspaceId: string;
  userId: string;
  collection: string;
}) {
  await validateWorkspaceAccess({ userId, workspaceId });

  const { database } = await createAdminClient();
  const prev = await database.getDocument(
    appwriteConfig.databaseId,
    collection,
    id,
  );

  let lnk: string = "";
  let imageKey = "";

  if (collection === "farms") {
    imageKey = "farmImage";
  } else if (collection === "fields") {
    imageKey = "fieldImage";
  }

  if (imageKey) {
    if (data[imageKey] instanceof File) {
      const uploaded = await uploadImage(data[imageKey] as File);
      lnk = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}&mode=public`;
    } else if (typeof data[imageKey] === "string") {
      lnk = data[imageKey] as string;
    }
  }

  const finalData = imageKey ? { ...data, [imageKey]: lnk } : { ...data };

  await database.updateDocument(appwriteConfig.databaseId, collection, id, {
    ...finalData,
    workspaces: workspaceId,
    users: userId,
  });

  const user = await getGuestByGuestId(userId);

  await createActivity({
    workspaceId,
    userId,
    farmId: collection === "farms" ? prev.$id : (prev?.farms ?? null),
    entityType: collection,
    entityId: id,
    action: "updated",
    message: buildUpdateMessage({
      collection,
      prev,
      data: finalData,
      userName: user?.fullName ?? "Guest",
    }),
  });
}
export async function img(obj: Omit<FieldInfo, "id" | "workspaces" | "users">) {
  const incl = Object.keys(obj).includes("fieldImage");

  const { avatar } = await createAdminClient();
  let lnk: string = "";
  if (incl) {
    const uploaded = await uploadImage(obj.fieldImage as unknown as File);
    lnk = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}&mode=public`;
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
    [
      Query.equal("workspaces", workspaceId),
      Query.equal("farms", farmId),
      Query.orderDesc("$createdAt"),
    ],
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
    [Query.equal("workspaces", workspaceId), Query.orderDesc("$createdAt")],
  );
  return res.documents.map((d) => {
    return { ...d };
  });
};
// export const updateDoc = async ({
//   collection,
//   id,
//   data,
//   workspaceId,
//   userId,
// }: {
//   collection: string;
//   id: string;
//   data: Record<string, string>;
//   workspaceId: string;
//   userId: string;
// }) => {
//   await validateWorkspaceAccess({ userId, workspaceId });
//   const { database } = await createAdminClient();
//   await database.updateDocument(
//     appwriteConfig.databaseId,
//     collection,
//     id,
//     data,
//   );
//   return true;
// };

export const updateDoc = async ({
  collection,
  id,
  data,
  workspaceId,
  userId,
}: {
  collection: string;
  id: string;
  data: Omit<
    | CropInfo
    | FieldInfo
    | HarvestInfo
    | TaskInfo
    | SalesInfo
    | ExpenseInfo
    | FarmInfo
    | NoteInfo,
    "id" | "workspaces" | "users"
  >;
  workspaceId: string;
  userId: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });

  const { database } = await createAdminClient();

  const prev = await database.getDocument(
    appwriteConfig.databaseId,
    collection,
    id,
  );

  await database.updateDocument(
    appwriteConfig.databaseId,
    collection,
    id,
    data,
  );
  const user = await getGuestByGuestId(userId);
  if (
    "assignTo" in data &&
    collection === "tasks" &&
    data.assignTo &&
    data.assignTo !== prev.assignTo
  ) {
    await createActivity({
      workspaceId,
      userId: data.assignTo as string,
      farmId: prev.farms,
      entityType: "tasks",
      entityId: id,
      action: "assigned",
      message: `You were assigned task "${prev.taskTitle}"`,
    });
  }
  await createActivity({
    workspaceId,
    userId,
    farmId: prev?.farms ?? null,
    entityType: collection,
    entityId: id,
    action: "updated",
    message: buildUpdateMessage({
      collection,
      prev,
      data,
      userName: user?.fullName ?? "Guest",
    }),
  });

  return true;
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

  const prev = await database.getDocument(
    appwriteConfig.databaseId,
    collection,
    id,
  );

  await database.updateDocument(appwriteConfig.databaseId, collection, id, {
    [field]: value,
  });

  const user = await getGuestByGuestId(userId);

  await createActivity({
    workspaceId,
    userId,
    farmId: prev?.farms ?? null,
    entityType: collection,
    entityId: id,
    action: "updated",
    message: buildUpdateMessage({
      collection,
      prev,
      data: {
        [field]: value,
      },
      userName: user?.fullName ?? "Guest",
    }),
  });
};
// export const deleteDoc = async ({
//   collection,
//   id,
//   workspaceId,
//   userId,
// }: {
//   collection: string;
//   id: string;
//   workspaceId: string;
//   userId: string;
// }) => {
//   await validateWorkspaceAccess({ userId, workspaceId });
//   const { database } = await createAdminClient();
//   await database.deleteDocument(appwriteConfig.databaseId, collection, id);
//   return true;
// };

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

  // ✅ 1. GET PREVIOUS DATA
  const prev = await database.getDocument(
    appwriteConfig.databaseId,
    collection,
    id,
  );

  // ✅ 2. DELETE
  await database.deleteDocument(appwriteConfig.databaseId, collection, id);
  const user = await getGuestByGuestId(userId);
  // ✅ 3. ACTIVITY LOG
  await createActivity({
    workspaceId,
    userId,
    farmId: prev?.farms ?? null,
    entityType: collection,
    entityId: `${collection}_${id}`,
    action: "deleted",
    message: buildDeleteMessage(collection, prev, user?.fullName ?? "Guest"),
  });

  return true;
};
