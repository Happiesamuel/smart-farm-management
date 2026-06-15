import { generateColors } from "./functions";

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

  const colors = generateColors(total);

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

export function buildFarmPerformance(
  farms: { [key: string]: string | number }[],
  sales: { [key: string]: string | number }[],
  expenses: { [key: string]: string | number }[],
  range: "year" | "month",
) {
  const now = new Date();

  const isSameMonth = (date: string | Date) => {
    const d = new Date(date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  };

  const isSameYear = (date: string | Date) => {
    return new Date(date).getFullYear() === now.getFullYear();
  };

  const filterFn = range === "month" ? isSameMonth : isSameYear;

  return farms
    .map((farm) => {
      // ✅ SALES → linked directly to farm
      const farmSales = sales.filter(
        (s) => s.farms === farm.$id && filterFn(s.saleDate as string),
      );

      // ✅ EXPENSES → linked directly to farm
      const farmExpenses = expenses.filter(
        (e) => e.farms === farm.$id && filterFn(e.expenseDate as string),
      );

      // 💰 Revenue
      const revenue = farmSales.reduce(
        (acc, s) => acc + (Number(s.totalAmount) || 0),
        0,
      );

      // 💸 Expenses
      const expense = farmExpenses.reduce(
        (acc, e) => acc + (Number(e.amount) || 0),
        0,
      );

      // 📈 Profit
      const profit = revenue - expense;

      // 📊 Margin
      const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;

      return {
        id: farm.$id,
        name: farm.farmName,
        revenue,
        expenses: expense,
        profit,
        margin,
      };
    })
    .sort((a, b) => b.profit - a.profit) // 🔥 top performing
    .slice(0, 5) as {
    id: string;
    name: string;
    revenue: number;
    expenses: number;
    profit: number;
    margin: number;
  }[];
}

export function buildRecentTasks(
  tasks: { [key: string]: string | number }[],
  fields: { [key: string]: string | number }[],
  farms: { [key: string]: string | number }[],
) {
  const fieldMap = new Map(fields.map((f) => [f.$id, f]));
  const farmMap = new Map(farms.map((f) => [f.$id, f]));

  const now = new Date();

  return tasks
    .map((task) => {
      const field = fieldMap.get(task.fields);
      const farm = farmMap.get(field?.farms as string);

      const due = task.dueDate ? new Date(task.dueDate) : null;

      const isOverdue = due && due < now && task.status !== "completed";
      const isToday = due && due.toDateString() === now.toDateString();

      return {
        id: task.$id,
        title: task.taskTitle,
        farm: farm?.farmName ?? "Unknown Farm",
        field: field?.fieldName ?? "Unknown Field",

        date: due
          ? due.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })
          : "No date",

        priority:
          (task.priority as string)?.charAt(0).toUpperCase() +
          (task.priority as string)?.slice(1),

        status: task.status,

        isDone: task.status === "completed",
        isOverdue,
        isToday,
      };
    })
    .sort((a, b) => {
      // 🔥 sort by urgency
      if (a.isOverdue) return -1;
      if (b.isOverdue) return 1;
      if (a.isToday) return -1;
      if (b.isToday) return 1;
      return 0;
    })
    .slice(0, 6) as {
    title: string;
    farm: string;
    field: string;
    date: string;
    priority: string;
    id: string;
    status: string;
    isOverdue: boolean;
    isToday: boolean;
  }[];
}
