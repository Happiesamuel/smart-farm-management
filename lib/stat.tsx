export function buildExpensePieData(
  expenses: { [key: string]: string | number }[],
) {
  const map = new Map<string, number>();

  expenses.forEach((e) => {
    const category = e.category || "Others";
    const amount = Number(e.amount || 0);

    map.set(category as string, (map.get(category as string) || 0) + amount);
  });

  const total = Array.from(map.values()).reduce((a, b) => a + b, 0);

  const colors = [
    "#3f86ee",
    "#53bf62",
    "#fdb214",
    "#e9575a",
    "#b893ed",
    "#c8c7ee",
  ];

  const data = Array.from(map.entries()).map(([name, amt], i) => ({
    food: name,
    value: total > 0 ? Math.round((amt / total) * 100) : 0,
    fill: colors[i % colors.length],
    exp: `₦${amt.toLocaleString()}`,
  }));

  return { data, total };
}
export function buildAreaChartData({
  sales = [],
  expenses = [],
  filter = "year", // "month" | "year"
}: {
  sales?: { [key: string]: string | number }[];
  expenses?: { [key: string]: string | number }[];
  filter?: "month" | "year";
}) {
  const map = new Map<string, { revenue: number; expenses: number }>();

  const formatKey = (date: string) => {
    const d = new Date(date);

    if (filter === "month") {
      return d.toLocaleDateString("en-US", { day: "numeric" }); // 1,2,3...
    }

    return d.toLocaleDateString("en-US", { month: "short" }); // Jan, Feb
  };

  // 🟢 SALES → revenue
  sales.forEach((s) => {
    const key = formatKey(s.saleDate as string);
    const prev = map.get(key) || { revenue: 0, expenses: 0 };

    prev.revenue += Number(s.totalAmount || 0);
    map.set(key, prev);
  });

  // 🔴 EXPENSES
  expenses.forEach((e) => {
    const key = formatKey((e.expenseDate as string) || (e.date as string));
    const prev = map.get(key) || { revenue: 0, expenses: 0 };

    prev.expenses += Number(e.amount || 0);
    map.set(key, prev);
  });

  // 🔁 convert to array
  return Array.from(map.entries()).map(([key, val]) => ({
    month: key,
    revenue: val.revenue,
    expenses: val.expenses,
  }));
}
export function buildOverviewStats(
  sales: { [key: string]: string | number }[],
  expenses: { [key: string]: string | number }[],
  range: "year" | "month",
) {
  const now = new Date();

  const isSameMonth = (date: string) => {
    const d = new Date(date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  };

  const isSameYear = (date: string) => {
    const d = new Date(date);
    return d.getFullYear() === now.getFullYear();
  };

  const filterFn = range === "month" ? isSameMonth : isSameYear;

  // 🔹 Filtered data
  const filteredSales = sales.filter((s) => filterFn(s.saleDate as string));
  const filteredExpenses = expenses.filter((e) =>
    filterFn(e.expenseDate as string),
  );

  // 🔹 Totals
  const revenue = filteredSales.reduce(
    (acc, s) => acc + (Number(s.totalAmount) || 0),
    0,
  );

  const expense = filteredExpenses.reduce(
    (acc, e) => acc + (Number(e.amount) || 0),
    0,
  );

  const profit = revenue - expense;

  return {
    revenue,
    expense,
    profit,
  };
}
export function buildDashboardStats({
  farms,
  fields,
  crops,
  tasks,
  sales,
  expenses,
}: {
  farms?: { [key: string]: string | number }[];
  fields?: { [key: string]: string | number }[];
  crops?: { [key: string]: string | number }[];
  tasks?: { [key: string]: string | number }[];
  sales?: { [key: string]: string | number }[];
  expenses?: { [key: string]: string | number }[];
}) {
  // ✅ SAFE DEFAULTS
  const safeFarms = Array.isArray(farms) ? farms : [];
  const safeFields = Array.isArray(fields) ? fields : [];
  const safeCrops = Array.isArray(crops) ? crops : [];
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const safeSales = Array.isArray(sales) ? sales : [];
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // 🔢 COUNTS
  const totalFarms = safeFarms.length;
  const totalFields = safeFields.length;
  const totalCrops = safeCrops.length;

  // ✅ ACTIVE TASKS (real logic)
  const activeTasks = safeTasks.filter((t) =>
    ["assigned", "in_progress"].includes(t.status as string),
  ).length;

  const completedTasks = safeTasks.filter(
    (t) => t.status === "completed",
  ).length;

  // 💰 REVENUE
  const totalRevenue = safeSales.reduce(
    (acc, s) => acc + (Number(s.totalAmount) || 0),
    0,
  );

  // 💸 EXPENSES
  const totalExpenses = safeExpenses.reduce(
    (acc, e) => acc + (Number(e.amount) || 0),
    0,
  );

  // 📈 PROFIT
  const netProfit = totalRevenue - totalExpenses;

  // 📊 PROFIT MARGIN
  const profitMargin =
    totalRevenue > 0
      ? Number(((netProfit / totalRevenue) * 100).toFixed(1))
      : 0;

  // 🧠 REAL-WORLD INSIGHTS

  // avg revenue per farm
  const avgRevenuePerFarm = totalFarms > 0 ? totalRevenue / totalFarms : 0;

  // avg expense per farm
  const avgExpensePerFarm = totalFarms > 0 ? totalExpenses / totalFarms : 0;

  // task completion rate
  const taskCompletionRate =
    safeTasks.length > 0
      ? Math.round((completedTasks / safeTasks.length) * 100)
      : 0;

  // 🚨 EMPTY STATE FLAG
  const isEmpty =
    !safeFarms.length &&
    !safeFields.length &&
    !safeCrops.length &&
    !safeTasks.length &&
    !safeSales.length &&
    !safeExpenses.length;

  return {
    // base stats
    totalFarms,
    totalFields,
    totalCrops,
    activeTasks,
    completedTasks,

    totalRevenue,
    totalExpenses,
    netProfit,
    profitMargin,

    // advanced stats
    avgRevenuePerFarm,
    avgExpensePerFarm,
    taskCompletionRate,

    // ui helpers
    isEmpty,
    hasSales: totalRevenue > 0,
    hasExpenses: totalExpenses > 0,
  };
}
