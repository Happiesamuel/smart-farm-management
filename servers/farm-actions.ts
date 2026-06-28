"use server";
import { ID, Query } from "appwrite";
import { createAdminClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";
import { FarmObj } from "@/lib/types";
import { formatLocation, uploadImage } from "@/lib/functions";
import { validateWorkspaceAccess } from "./crud-actions";

export async function createFarm(obj: FarmObj) {
  try {
    const incl = Object.keys(obj).includes("farmImage");
    const { database, avatar } = await createAdminClient();
    let lnk: string = "";
    if (incl) {
      const uploaded = await uploadImage(obj.farmImage as unknown as File);
      lnk = `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}&mode=public`;
    } else {
      lnk = avatar.getInitials({ name: obj.farmName });
    }

    const farm = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      ID.unique(),
      { ...obj, farmImage: lnk },
    );

    return { success: true, data: { id: farm.$id, name: farm.name } };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
}

export const getFarmInWorkspace = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  try {
    const { database } = await createAdminClient();
    const membership = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.workspaceMembersCollectionId,
      [Query.equal("users", userId), Query.equal("workspaces", workspaceId)],
    );

    if (membership.total === 0) return { success: true, data: null };

    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      [Query.equal("workspaces", workspaceId)],
    );

    return {
      success: true,
      data: result.documents.map((doc) => ({
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
      })),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export async function getFarm(userId: string | undefined) {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.farmCollectionId,
      [Query.equal("users", userId!)],
    );

    if (result.documents.length === 0) return { success: true, data: null };

    return {
      success: true,
      data: result.documents.map((doc) => ({
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
      })),
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
}

export const getFarmsWithStats = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  try {
    await validateWorkspaceAccess({ userId, workspaceId });

    const { database } = await createAdminClient();

    const [farmsRes, fieldsRes, cropsRes, harvestRes] = await Promise.all([
      database.listDocuments(appwriteConfig.databaseId, "farms", [Query.equal("workspaces", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "fields", [Query.equal("workspaces", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "crops", [Query.equal("workspaces", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "harvests", [Query.equal("workspaces", workspaceId)]),
    ]);

    const farmsWithStats = farmsRes.documents.map((farm) => ({
      id: farm.$id,
      name: farm.farmName,
      image: farm.farmImage,
      location: formatLocation(farm.address),
      totalFields: fieldsRes.documents.filter((f) => f.farms === farm.$id).length,
      totalCrops: cropsRes.documents.filter((c) => c.farms === farm.$id).length,
      totalHarvest: harvestRes.documents.filter((s) => s.farms === farm.$id).length,
      status: farm.status || "active",
    }));

    return { success: true, data: farmsWithStats };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getAllFarmStats = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  try {
    await validateWorkspaceAccess({ workspaceId, userId });

    const { database } = await createAdminClient();

    const [farmsRes, fieldsRes, cropsRes, salesRes] = await Promise.all([
      database.listDocuments(appwriteConfig.databaseId, "farms", [Query.equal("workspaces", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "fields", [Query.equal("workspaces", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "crops", [Query.equal("workspaces", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "sales", [Query.equal("workspaces", workspaceId)]),
    ]);

    return {
      success: true,
      data: {
        totalFarms: farmsRes.total,
        totalFields: fieldsRes.total,
        totalCrops: cropsRes.total,
        totalRevenue: salesRes.documents.reduce((acc, sale) => acc + (sale.totalAmount || 0), 0),
      },
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getSingleFarmDocs = async ({
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
  try {
    await validateWorkspaceAccess({ userId, workspaceId });
    const { database } = await createAdminClient();
    const res = await database.listDocuments(
      appwriteConfig.databaseId,
      collection,
      [Query.equal("workspaces", workspaceId), Query.equal("$id", farmId)],
    );
    const d = res.documents.at(0);
    if (!d?.$id) throw new Error("Farm not found!");

    return {
      success: true,
      data: {
        description: d.description,
        farmName: d.farmName,
        farmImage: d.farmImage,
        address: d.address,
        lat: d.lat,
        lng: d.lng,
        size: d.size,
        unit: d.unit,
        soilType: d.soilType,
        status: d.status,
        users: d.users,
        workspaces: d.workspaces,
        id: d.$id,
      },
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getSingleFieldDocs = async ({
  collection,
  workspaceId,
  userId,
  farmId,
  fieldId,
}: {
  collection: string;
  workspaceId: string;
  userId: string;
  farmId: string;
  fieldId: string;
}) => {
  try {
    await validateWorkspaceAccess({ userId, workspaceId });
    const { database } = await createAdminClient();
    const res = await database.listDocuments(
      appwriteConfig.databaseId,
      collection,
      [
        Query.equal("workspaces", workspaceId),
        Query.equal("$id", fieldId),
        Query.equal("farms", farmId),
      ],
    );
    const d = res.documents.at(0);
    if (!d?.$id) throw new Error("Field not found!");

    return {
      success: true,
      data: {
        fieldName: d.fieldName,
        size: d.size,
        fieldImage: d.fieldImage,
        sizeUnit: d.sizeUnit,
        soilType: d.soilType,
        irrigationType: d.irrigationType,
        description: d.description,
        status: d.status,
        farms: d.farms,
        id: d.$id,
        workspaces: d.workspaces,
        users: d.users,
      },
    };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getAssignedFarms = async ({
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

    const farmDocs = await database.listDocuments(
      appwriteConfig.databaseId,
      "farms",
      [Query.equal("workspaces", workspaceId), Query.equal("$id", farmIds)],
    );

    return { success: true, data: farmDocs.documents.map((x) => ({ ...x })) };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};