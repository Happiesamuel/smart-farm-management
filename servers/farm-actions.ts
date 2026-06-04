"use server";
import { ID, Query } from "appwrite";
import { createAdminClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";
import { FarmObj } from "@/lib/types";
import { uploadImage } from "@/lib/functions";
import { validateWorkspaceAccess } from "./crud-actions";

export async function createFarm(obj: FarmObj) {
  try {
    const incl = Object.keys(obj).includes("farmImage");
    const { database, avatar } = await createAdminClient();
    let lnk: string = "";
    if (incl) {
      const uploaded = await uploadImage(obj.farmImage as unknown as File);
      lnk = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}&mode=admin`;
    } else {
      lnk = avatar.getInitials({
        name: obj.farmName,
      });
    }

    const farm = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      ID.unique(),
      {
        ...obj,
        farmImage: lnk,
      },
    );

    return { id: farm.$id, name: farm.name };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

export const getFarmInWorkspace = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  const { database } = await createAdminClient();
  const membership = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.workspaceMembersCollectionId,
    [Query.equal("users", userId), Query.equal("workspaces", workspaceId)],
  );

  if (membership.total === 0) {
    return null;
  }

  // ✅ Step 2: Fetch farms
  const result = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.farmCollectionId,
    [Query.equal("workspaces", workspaceId)],
  );
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
};

export async function getFarm(userId: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      [Query.equal("users", userId!)],
    );

    if (result.documents.length === 0) {
      return null;
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

export const getFarmsWithStats = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });

  const { database } = await createAdminClient();

  const [farmsRes, fieldsRes, cropsRes, salesRes] = await Promise.all([
    database.listDocuments(appwriteConfig.databaseId, "farms", [
      Query.equal("workspaceId", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "fields", [
      Query.equal("workspaceId", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "crops", [
      Query.equal("workspaceId", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "sales", [
      Query.equal("workspaceId", workspaceId),
    ]),
  ]);

  const farms = farmsRes.documents;
  const fields = fieldsRes.documents;
  const crops = cropsRes.documents;
  const sales = salesRes.documents;

  // 🔥 map farms with computed stats
  const farmsWithStats = farms.map((farm) => {
    const farmFields = fields.filter((f) => f.farmId === farm.$id);

    const farmCrops = crops.filter((c) => c.farmId === farm.$id);

    const farmSales = sales.filter((s) => s.farmId === farm.$id);

    const totalRevenue = farmSales.reduce(
      (sum: number, s) => sum + (s.revenue || 0),
      0,
    );

    return {
      id: farm.$id,
      name: farm.name,
      image: farm.image, // optional
      location: farm.location,
      totalFields: farmFields.length,
      totalCrops: farmCrops.length,
      revenue: `₦${totalRevenue.toLocaleString()}`,
      status: farm.status || "Active",
    };
  });

  return farmsWithStats;
};
