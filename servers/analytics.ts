"use server";
import { Query } from "appwrite";
import { getDocs, validateWorkspaceAccess } from "./crud-actions";
import { createAdminClient } from "./appwrite";
import { appwriteConfig } from "./appwrite-client";

export const getWorkspaceAnalytics = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  try {
    await validateWorkspaceAccess({ userId, workspaceId });

    const { database } = await createAdminClient();

    const [farmsRes, fieldsRes, cropsRes, salesRes, expensesRes] =
      await Promise.all([
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
        database.listDocuments(appwriteConfig.databaseId, "expenses", [
          Query.equal("workspaceId", workspaceId),
        ]),
      ]);

    const totalFarms = farmsRes.documents.length;
    const totalFields = fieldsRes.documents.length;
    const totalCrops = cropsRes.documents.length;
    const totalRevenue = salesRes.documents.reduce(
      (sum, s) => sum + (s.revenue || 0),
      0,
    );
    const totalExpenses = expensesRes.documents.reduce(
      (sum, e) => sum + (e.amount || 0),
      0,
    );
    const profit = totalRevenue - totalExpenses;
    const fieldsPerFarm =
      totalFarms > 0 ? Math.round(totalFields / totalFarms) : 0;
    const revenuePerFarm =
      totalFarms > 0 ? Math.round(totalRevenue / totalFarms) : 0;

    return {
      success: true,
      data: {
        totalFarms,
        totalFields,
        totalCrops,
        totalRevenue,
        totalExpenses,
        profit,
        fieldsPerFarm,
        revenuePerFarm,
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getDashboardStats = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  try {
    await validateWorkspaceAccess({ userId, workspaceId });

    const { database } = await createAdminClient();

    const [farmsRes, fieldsRes, cropsRes, tasksRes, salesRes, expensesRes] =
      await Promise.all([
        database.listDocuments(appwriteConfig.databaseId, "farms", [
          Query.equal("workspaceId", workspaceId),
        ]),
        database.listDocuments(appwriteConfig.databaseId, "fields", [
          Query.equal("workspaceId", workspaceId),
        ]),
        database.listDocuments(appwriteConfig.databaseId, "crops", [
          Query.equal("workspaceId", workspaceId),
        ]),
        database.listDocuments(appwriteConfig.databaseId, "tasks", [
          Query.equal("workspaceId", workspaceId),
          Query.equal("status", "active"),
        ]),
        database.listDocuments(appwriteConfig.databaseId, "sales", [
          Query.equal("workspaceId", workspaceId),
        ]),
        database.listDocuments(appwriteConfig.databaseId, "expenses", [
          Query.equal("workspaceId", workspaceId),
        ]),
      ]);

    const totalRevenue = salesRes.documents.reduce(
      (sum, s) => sum + (s.revenue || 0),
      0,
    );
    const totalExpenses = expensesRes.documents.reduce(
      (sum, e) => sum + (e.amount || 0),
      0,
    );
    const netProfit = totalRevenue - totalExpenses;
    const formatCurrency = (num: number) => `₦${num.toLocaleString()}`;

    return {
      success: true,
      data: {
        stats: [
          { name: "Total Farms", value: farmsRes.total },
          { name: "Total Fields", value: fieldsRes.total },
          { name: "Total Crops", value: cropsRes.total },
          { name: "Active Tasks", value: tasksRes.total },
          { name: "Total Revenue", value: formatCurrency(totalRevenue) },
          { name: "Total Expenses", value: formatCurrency(totalExpenses) },
          { name: "Net Profit", value: formatCurrency(netProfit) },
        ],
        raw: {
          totalFarms: farmsRes.total,
          totalFields: fieldsRes.total,
          totalCrops: cropsRes.total,
          activeTasks: tasksRes.total,
          totalRevenue,
          totalExpenses,
          netProfit,
        },
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getFarmFinanceStats = async ({
  workspaceId,
  farmId,
  userId,
}: {
  workspaceId: string;
  farmId: string;
  userId: string;
}) => {
  try {
    await validateWorkspaceAccess({ workspaceId, userId });

    const { database } = await createAdminClient();

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [salesRes, expensesRes] = await Promise.all([
      database.listDocuments(appwriteConfig.databaseId, "sales", [
        Query.equal("workspaces", workspaceId),
        Query.equal("farms", farmId),
      ]),
      database.listDocuments(appwriteConfig.databaseId, "expenses", [
        Query.equal("workspaces", workspaceId),
        Query.equal("farms", farmId),
      ]),
    ]);

    const totalRevenue = salesRes.documents.reduce(
      (acc, s) => acc + (s.totalAmount || 0),
      0,
    );
    const totalExpenses = expensesRes.documents.reduce(
      (acc, e) => acc + (e.amount || 0),
      0,
    );
    const profit = totalRevenue - totalExpenses;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    const thisMonthRevenue = salesRes.documents
      .filter((s) => new Date(s.saleDate) >= startOfThisMonth)
      .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

    const thisMonthExpenses = expensesRes.documents
      .filter((e) => new Date(e.expenseDate) >= startOfThisMonth)
      .reduce((acc, e) => acc + (e.amount || 0), 0);

    const lastMonthRevenue = salesRes.documents
      .filter(
        (s) =>
          new Date(s.saleDate) >= startOfLastMonth &&
          new Date(s.saleDate) <= endOfLastMonth,
      )
      .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

    const lastMonthExpenses = expensesRes.documents
      .filter(
        (e) =>
          new Date(e.expenseDate) >= startOfLastMonth &&
          new Date(e.expenseDate) <= endOfLastMonth,
      )
      .reduce((acc, e) => acc + (e.amount || 0), 0);

    const calcChange = (current: number, prev: number) => {
      if (prev === 0) return current > 0 ? 100 : 0;
      return ((current - prev) / prev) * 100;
    };

    const thisMonthProfit = thisMonthRevenue - thisMonthExpenses;
    const lastMonthProfit = lastMonthRevenue - lastMonthExpenses;
    const thisMonthMargin =
      thisMonthRevenue > 0 ? (thisMonthProfit / thisMonthRevenue) * 100 : 0;
    const lastMonthMargin =
      lastMonthRevenue > 0 ? (lastMonthProfit / lastMonthRevenue) * 100 : 0;

    return {
      success: true,
      data: {
        totalRevenue,
        totalExpenses,
        profit,
        margin,
        revenueChange: calcChange(thisMonthRevenue, lastMonthRevenue),
        expenseChange: calcChange(thisMonthExpenses, lastMonthExpenses),
        profitChange: calcChange(thisMonthProfit, lastMonthProfit),
        marginChange: calcChange(thisMonthMargin, lastMonthMargin),
      },
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getLandingStats = async () => {
  try {
    const { database } = await createAdminClient();

    const [users, farms, fields, tasks, workspaces, crops] = await Promise.all([
      database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [],
      ),
      database.listDocuments(appwriteConfig.databaseId, "farms", []),
      database.listDocuments(appwriteConfig.databaseId, "fields", []),
      database.listDocuments(appwriteConfig.databaseId, "tasks", [
        Query.equal("status", "completed"),
      ]),
      database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.workspaceCollectionId,
        [],
      ),
      database.listDocuments(appwriteConfig.databaseId, "crops", []),
    ]);

    return {
      users: users.total,
      farms: farms.total,
      fields: fields.total,
      tasks: tasks.total,
      workspaces: workspaces.total,
      crops: crops.total,
    };
  } catch (error) {
    const err = error as unknown as Error;
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};

export const getInsightData = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  try {
    const [
      farms,
      fields,
      crops,
      tasks,
      harvests,
      expenses,
      sales,
      notes,
      alerts,
      activities,
    ] = await Promise.all([
      getDocs({
        collection: "farms",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "fields",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "crops",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "tasks",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "harvests",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "expenses",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "sales",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "notes",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "alerts",
        workspaceId,
        userId,
      }),

      getDocs({
        collection: "activities",
        workspaceId,
        userId,
      }),
    ]);

    const collections = [
      farms,
      fields,
      crops,
      tasks,
      harvests,
      expenses,
      sales,
      notes,
      alerts,
      activities,
    ];

    const failed = collections.find((c) => !c.success);

    if (failed) {
      return {
        success: false,
        error: failed.error,
      };
    }

    return {
      success: true,

      data: {
        farms: farms.data,
        fields: fields.data,
        crops: crops.data,
        tasks: tasks.data,
        harvests: harvests.data,
        expenses: expenses.data,
        sales: sales.data,
        notes: notes.data,
        alerts: alerts.data,
        activities: activities.data,
      },
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      error: err.message,
    };
  }
};
