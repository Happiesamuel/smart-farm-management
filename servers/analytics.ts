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
  await validateWorkspaceAccess({ userId, workspaceId });

  const { database } = await createAdminClient();

  // 🔹 Fetch all data in parallel (VERY IMPORTANT)
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

  const farms = farmsRes.documents;
  const fields = fieldsRes.documents;
  const crops = cropsRes.documents;
  const sales = salesRes.documents;
  const expenses = expensesRes.documents;

  // 🔥 COUNTS
  const totalFarms = farms.length;
  const totalFields = fields.length;
  const totalCrops = crops.length;

  // 💰 FINANCIALS
  const totalRevenue = sales.reduce((sum, s) => sum + (s.revenue || 0), 0);

  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const profit = totalRevenue - totalExpenses;

  // 📊 RATIOS
  const fieldsPerFarm =
    totalFarms > 0 ? Math.round(totalFields / totalFarms) : 0;

  const revenuePerFarm =
    totalFarms > 0 ? Math.round(totalRevenue / totalFarms) : 0;

  return {
    totalFarms,
    totalFields,
    totalCrops,
    totalRevenue,
    totalExpenses,
    profit,
    fieldsPerFarm,
    revenuePerFarm,
  };
};

export const getDashboardStats = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  await validateWorkspaceAccess({ userId, workspaceId });

  const { database } = await createAdminClient();

  // 🔥 Parallel fetch (VERY IMPORTANT for performance)
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
        Query.equal("status", "active"), // 👈 IMPORTANT
      ]),
      database.listDocuments(appwriteConfig.databaseId, "sales", [
        Query.equal("workspaceId", workspaceId),
      ]),
      database.listDocuments(appwriteConfig.databaseId, "expenses", [
        Query.equal("workspaceId", workspaceId),
      ]),
    ]);

  // 📊 COUNTS
  const totalFarms = farmsRes.total;
  const totalFields = fieldsRes.total;
  const totalCrops = cropsRes.total;
  const activeTasks = tasksRes.total;

  // 💰 FINANCIALS
  const totalRevenue = salesRes.documents.reduce(
    (sum, s) => sum + (s.revenue || 0),
    0,
  );

  const totalExpenses = expensesRes.documents.reduce(
    (sum, e) => sum + (e.amount || 0),
    0,
  );

  const netProfit = totalRevenue - totalExpenses;

  // 🎯 FORMAT (IMPORTANT FOR UI)
  const formatCurrency = (num: number) => `₦${num.toLocaleString()}`;

  return {
    stats: [
      {
        name: "Total Farms",
        value: totalFarms,
      },
      {
        name: "Total Fields",
        value: totalFields,
      },
      {
        name: "Total Crops",
        value: totalCrops,
      },
      {
        name: "Active Tasks",
        value: activeTasks,
      },
      {
        name: "Total Revenue",
        value: formatCurrency(totalRevenue),
      },
      {
        name: "Total Expenses",
        value: formatCurrency(totalExpenses),
      },
      {
        name: "Net Profit",
        value: formatCurrency(netProfit),
      },
    ],

    // 🔥 BONUS (for charts later)
    raw: {
      totalFarms,
      totalFields,
      totalCrops,
      activeTasks,
      totalRevenue,
      totalExpenses,
      netProfit,
    },
  };
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
  const { database } = await createAdminClient();

  await validateWorkspaceAccess({ workspaceId, userId });

  // 📅 Date ranges
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // 🚀 Fetch sales & expenses
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

  // 🔢 TOTALS (ALL TIME)
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

  // 📊 THIS MONTH
  const thisMonthRevenue = salesRes.documents
    .filter((s) => new Date(s.saleDate) >= startOfThisMonth)
    .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

  const thisMonthExpenses = expensesRes.documents
    .filter((e) => new Date(e.expenseDate) >= startOfThisMonth)
    .reduce((acc, e) => acc + (e.amount || 0), 0);

  // 📊 LAST MONTH
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

  // 📈 % CHANGE CALC
  const calcChange = (current: number, prev: number) => {
    if (prev === 0) return current > 0 ? 100 : 0;
    return ((current - prev) / prev) * 100;
  };

  const revenueChange = calcChange(thisMonthRevenue, lastMonthRevenue);
  const expenseChange = calcChange(thisMonthExpenses, lastMonthExpenses);

  const thisMonthProfit = thisMonthRevenue - thisMonthExpenses;
  const lastMonthProfit = lastMonthRevenue - lastMonthExpenses;

  const profitChange = calcChange(thisMonthProfit, lastMonthProfit);

  const thisMonthMargin =
    thisMonthRevenue > 0 ? (thisMonthProfit / thisMonthRevenue) * 100 : 0;

  const lastMonthMargin =
    lastMonthRevenue > 0 ? (lastMonthProfit / lastMonthRevenue) * 100 : 0;

  const marginChange = calcChange(thisMonthMargin, lastMonthMargin);

  return {
    totalRevenue,
    totalExpenses,
    profit,
    margin,

    revenueChange,
    expenseChange,
    profitChange,
    marginChange,
  };
};
