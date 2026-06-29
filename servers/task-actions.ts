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
  try {
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
      success: true,
      data: {
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
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getWorkerNotes = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  try {
    await validateWorkspaceAccess({ workspaceId, userId });

    const { database } = await createAdminClient();

    const taskDocs = await database.listDocuments(
      appwriteConfig.databaseId,
      "tasks",
      [Query.equal("workspaces", workspaceId), Query.equal("assignTo", userId)],
    );

    const farmIds = [...new Set(taskDocs.documents.map((t) => t.farms))];

    if (!farmIds.length) return { success: true, data: [] };

    const noteDocs = await database.listDocuments(
      appwriteConfig.databaseId,
      "notes",
      [
        Query.equal("workspaces", workspaceId),
        Query.equal("farms", farmIds),
        Query.orderDesc("$createdAt"),
      ],
    );

    return {
      success: true,
      data: noteDocs.documents.map((n) => ({
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
      })),
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};
