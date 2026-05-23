"use server";
import { ID } from "appwrite";
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
