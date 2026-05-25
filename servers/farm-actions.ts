"use server";
import { ID, Query } from "appwrite";
import { createAdminClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";
import { FarmObj } from "@/lib/types";
import { uploadImage } from "@/lib/functions";

export async function createFarm(obj: FarmObj) {
  try {
    const { database } = await createAdminClient();

    const uploaded = await uploadImage(obj.farmImage as unknown as File);
    const farm = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      ID.unique(),
      {
        ...obj,
        farmImage: `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}&mode=admin`,
      },
    );

    return { id: farm.$id, name: farm.name };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getFarmInWorkspace(
  userId: string | undefined,
  workspaceId: string,
) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      [Query.equal("users", userId!), Query.equal("workspaces", workspaceId!)],
    );

    if (result.documents.length === 0) {
      throw new Error("No workspace found");
    }

    return result.documents.map((doc) => {
      return {
        id: doc.$id,
        farmName: doc.farmName,
        status: doc.status,
        unit: doc.unit,
        soilType: doc.soilType,
        description: doc.description,
        workspaces: doc.workspaces,
        users: doc.users,
        address: doc.address,
        lat: doc.lat,
        lng: doc.lng,
        farmImage: doc.farmImage,
        size: doc.size,
      };
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getFarm(userId: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      [Query.equal("users", userId!)],
    );

    if (result.documents.length === 0) {
      throw new Error("No workspace found");
    }

    return result.documents.map((doc) => {
      return {
        id: doc.$id,
        farmName: doc.farmName,
        status: doc.status,
        unit: doc.unit,
        soilType: doc.soilType,
        description: doc.description,
        workspaces: doc.workspaces,
        users: doc.users,
        address: doc.address,
        lat: doc.lat,
        lng: doc.lng,
        farmImage: doc.farmImage,
        size: doc.size,
      };
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
