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
  };
};
