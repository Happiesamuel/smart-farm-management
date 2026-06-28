"use server";
import { Query } from "appwrite";
import { validateWorkspaceAccess } from "./crud-actions";
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

    const [farmsRes, fieldsRes, cropsRes, salesRes, expensesRes] = await Promise.all([
      database.listDocuments(appwriteConfig.databaseId, "farms", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "fields", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "crops", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "sales", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "expenses", [Query.equal("workspaceId", workspaceId)]),
    ]);

    const totalFarms = farmsRes.documents.length;
    const totalFields = fieldsRes.documents.length;
    const totalCrops = cropsRes.documents.length;
    const totalRevenue = salesRes.documents.reduce((sum, s) => sum + (s.revenue || 0), 0);
    const totalExpenses = expensesRes.documents.reduce((sum, e) => sum + (e.amount || 0), 0);
    const profit = totalRevenue - totalExpenses;
    const fieldsPerFarm = totalFarms > 0 ? Math.round(totalFields / totalFarms) : 0;
    const revenuePerFarm = totalFarms > 0 ? Math.round(totalRevenue / totalFarms) : 0;

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
  } catch (err: any) {
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

    const [farmsRes, fieldsRes, cropsRes, tasksRes, salesRes, expensesRes] = await Promise.all([
      database.listDocuments(appwriteConfig.databaseId, "farms", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "fields", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "crops", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "tasks", [
        Query.equal("workspaceId", workspaceId),
        Query.equal("status", "active"),
      ]),
      database.listDocuments(appwriteConfig.databaseId, "sales", [Query.equal("workspaceId", workspaceId)]),
      database.listDocuments(appwriteConfig.databaseId, "expenses", [Query.equal("workspaceId", workspaceId)]),
    ]);

    const totalRevenue = salesRes.documents.reduce((sum, s) => sum + (s.revenue || 0), 0);
    const totalExpenses = expensesRes.documents.reduce((sum, e) => sum + (e.amount || 0), 0);
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
  } catch (err: any) {
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

    const totalRevenue = salesRes.documents.reduce((acc, s) => acc + (s.totalAmount || 0), 0);
    const totalExpenses = expensesRes.documents.reduce((acc, e) => acc + (e.amount || 0), 0);
    const profit = totalRevenue - totalExpenses;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    const thisMonthRevenue = salesRes.documents
      .filter((s) => new Date(s.saleDate) >= startOfThisMonth)
      .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

    const thisMonthExpenses = expensesRes.documents
      .filter((e) => new Date(e.expenseDate) >= startOfThisMonth)
      .reduce((acc, e) => acc + (e.amount || 0), 0);

    const lastMonthRevenue = salesRes.documents
      .filter((s) => new Date(s.saleDate) >= startOfLastMonth && new Date(s.saleDate) <= endOfLastMonth)
      .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

    const lastMonthExpenses = expensesRes.documents
      .filter((e) => new Date(e.expenseDate) >= startOfLastMonth && new Date(e.expenseDate) <= endOfLastMonth)
      .reduce((acc, e) => acc + (e.amount || 0), 0);

    const calcChange = (current: number, prev: number) => {
      if (prev === 0) return current > 0 ? 100 : 0;
      return ((current - prev) / prev) * 100;
    };

    const thisMonthProfit = thisMonthRevenue - thisMonthExpenses;
    const lastMonthProfit = lastMonthRevenue - lastMonthExpenses;
    const thisMonthMargin = thisMonthRevenue > 0 ? (thisMonthProfit / thisMonthRevenue) * 100 : 0;
    const lastMonthMargin = lastMonthRevenue > 0 ? (lastMonthProfit / lastMonthRevenue) * 100 : 0;

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
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unknown error" };
  }
};