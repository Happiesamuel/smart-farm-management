"use server";

import { Query } from "appwrite";
import { createAdminClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";
import { validateWorkspaceAccess } from "./crud-actions";

export const getSingleTaskDocs = async ({
  collection,
  workspaceId,
  userId,
  taskId,
}: {
  collection: string;
  workspaceId: string;
  userId: string;
  taskId: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });
  const { database } = await createAdminClient();
  const res = await database.listDocuments(
    appwriteConfig.databaseId,
    collection,
    [Query.equal("workspaces", workspaceId), Query.equal("$id", taskId)],
  );
  const d = res.documents.at(0);
  if (!d?.$id) throw new Error("Task not found!");
  return {
    taskTitle: d.taskTitle,
    farms: d.farms,
    fields: d.fields,
    priority: d.priority,
    assignTo: d.assignTo,
    description: d.description,
    status: d.status,
    dueDate: d.dueDate,
    id: d.$id,
    workspaces: d.workspaces,
    users: d.users,
    createdAt: d.$createdAt,
    updatedAt: d.$updatedAt,
  };
};

export const getWorkerNotes = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  await validateWorkspaceAccess({ workspaceId, userId });

  const { database } = await createAdminClient();

  // Get worker tasks
  const taskDocs = await database.listDocuments(
    appwriteConfig.databaseId,
    "tasks",
    [Query.equal("workspaces", workspaceId), Query.equal("assignTo", userId)],
  );

  const fieldIds = [...new Set(taskDocs.documents.map((t) => t.fields))];

  if (!fieldIds.length) return [];

  const noteDocs = await database.listDocuments(
    appwriteConfig.databaseId,
    "notes",
    [
      Query.equal("workspaces", workspaceId),
      Query.equal("fields", fieldIds),
      Query.orderDesc("$createdAt"),
    ],
  );

  return noteDocs.documents.map((n) => {
    return {
      title: n.title,
      farms: n.farms,
      fields: n.fields,
      priority: n.priority,
      description: n.description,
      type: n.type,
      $id: n.$id,
      workspaces: n.workspaces,
      users: n.users,
      $createdAt: n.$createdAt,
    };
  });
};
