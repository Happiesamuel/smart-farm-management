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

  const [farmsRes, fieldsRes, cropsRes, harvestRes] = await Promise.all([
    database.listDocuments(appwriteConfig.databaseId, "farms", [
      Query.equal("workspaces", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "fields", [
      Query.equal("workspaces", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "crops", [
      Query.equal("workspaces", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "harvests", [
      Query.equal("workspaces", workspaceId),
    ]),
  ]);

  const farms = farmsRes.documents;
  const fields = fieldsRes.documents;
  const crops = cropsRes.documents;
  const harvests = harvestRes.documents;

  const farmsWithStats = farms.map((farm) => {
    const farmFields = fields.filter((f) => f.farms === farm.$id);

    const farmCrops = crops.filter((c) => c.farms === farm.$id);

    const farmHarvests = harvests.filter((s) => s.farms === farm.$id);

    return {
      id: farm.$id,
      name: farm.farmName,
      image: farm.farmImage,
      location: formatLocation(farm.address),
      totalFields: farmFields.length,
      totalCrops: farmCrops.length,
      totalHarvest: farmHarvests.length,
      status: farm.status || "active",
    };
  });

  return farmsWithStats;
};

export const getAllFarmStats = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  const { database } = await createAdminClient();

  // 🔐 validate access
  await validateWorkspaceAccess({ workspaceId, userId });

  // 🚀 Fetch all in parallel
  const [farmsRes, fieldsRes, cropsRes, salesRes] = await Promise.all([
    database.listDocuments(appwriteConfig.databaseId, "farms", [
      Query.equal("workspaces", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "fields", [
      Query.equal("workspaces", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "crops", [
      Query.equal("workspaces", workspaceId),
    ]),
    database.listDocuments(appwriteConfig.databaseId, "sales", [
      Query.equal("workspaces", workspaceId),
    ]),
  ]);

  // 📊 Calculate totals
  const totalFarms = farmsRes.total;
  const totalFields = fieldsRes.total;
  const totalCrops = cropsRes.total;

  const totalRevenue = salesRes.documents.reduce(
    (acc, sale) => acc + (sale.totalAmount || 0),
    0,
  );

  return {
    totalFarms,
    totalFields,
    totalCrops,
    totalRevenue,
  };
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
  };
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
  };
};
