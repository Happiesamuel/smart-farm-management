import { MdLabelImportantOutline } from "react-icons/md";
import { formatLocation, generateColors } from "./functions";
import { FaRegUser } from "react-icons/fa6";

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
  range?: "year" | "month",
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

function toKg(qty: number, unit: string) {
  switch (unit?.toLowerCase()) {
    case "tons":
      return qty * 1000;
    case "bags":
      return qty * 50;
    case "crates":
      return qty * 25; // 🔥 you were missing this earlier
    default:
      return qty;
  }
}

export function buildFarmOverviewPieData(
  harvests: { [key: string]: string | number }[],
  crops: { [key: string]: string | number }[],
) {
  const cropMap = new Map(crops.map((c) => [c.$id, c.cropName]));
  const map = new Map<string, number>();

  harvests.forEach((h) => {
    const cropName = cropMap.get(h.crops) || "Unknown";
    const qty = toKg(Number(h.quantity || 0), h.unit as string);

    map.set(cropName as string, (map.get(cropName as string) || 0) + qty);
  });

  const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
  console.log(total, "sal");

  const colors = generateColors(map.size);

  const data = Array.from(map.entries()).map(([name, qty], i) => ({
    food: name,
    value: total > 0 ? Math.round((qty / total) * 100) : 0,
    fill: colors[i],
    qty, // 🔥 keep raw value
  }));

  return { data, total };
}
export function buildFarmOverview({
  farmId,
  fields = [],
  crops = [],
  tasks = [],
  sales = [],
  expenses = [],
}: {
  farmId: string;
  fields?: { [key: string]: string | number }[];
  crops?: { [key: string]: string | number }[];
  tasks?: { [key: string]: string | number }[];
  sales?: { [key: string]: string | number }[];
  expenses?: { [key: string]: string | number }[];
}) {
  const now = new Date();

  const isThisMonth = (date: string) => {
    const d = new Date(date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  };

  // 🔹 Fields in farm
  const fieldIds = fields.map((f) => f.$id);

  // 🔹 Active crops (not harvested)
  const activeCrops = crops.filter(
    (c) => fieldIds.includes(c.fields) && c.growthStage !== "harvesting",
  );

  // 🔹 Active tasks
  const activeTasks = tasks.filter(
    (t) => fieldIds.includes(t.fields) && t.status !== "completed",
  );

  // 🔹 Revenue (this month)
  const revenue = sales
    .filter((s) => s.farms === farmId && isThisMonth(s.saleDate as string))
    .reduce((acc, s) => acc + Number(s.totalAmount || 0), 0);

  // 🔹 Expenses (this month)
  const expense = expenses
    .filter((e) => e.farms === farmId && isThisMonth(e.expenseDate as string))
    .reduce((acc, e) => acc + Number(e.amount || 0), 0);

  const profit = revenue - expense;

  return {
    totalFields: fields.length,
    totalCrops: activeCrops.length,
    activeTasks: activeTasks.length,
    revenue,
    profit,
  };
}

function formatDate(date?: string | Date) {
  if (!date) return "No date";

  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buildTaskActivities(
  task: { [key: string]: string },
  users: { [key: string]: string }[],
) {
  if (!task) return [];

  const assignTo = users.find((x) => x.id === task?.assignTo);
  const createdBy = users.find((x) => x.id === task?.users);

  const acts = [];

  // ✅ CREATED
  acts.push({
    id: `created-${task.$id}`,
    title: `Task created by ${createdBy?.name ?? "Unknown user"}`,
    date: task.createdAt,
    icon: FaRegUser,
    iconColor: "bg-[#e8f5ec] text-[#2d8952]",
  });

  // ✅ ASSIGNED
  if (task.assignTo) {
    acts.push({
      id: `assigned-${task.$id}`,
      title: `Assigned to ${assignTo?.name ?? "Unknown user"}`,
      date: task.updatedAt || task.createdAt,
      icon: FaRegUser,
      iconColor: "bg-[#e1eefd] text-[#1058d6]",
    });
  }

  // ✅ STATUS
  const statusMap: Record<string, { label: string; color: string }> = {
    assigned: {
      label: "Pending",
      color: "bg-[#fee7e7] text-[#e82a2d]",
    },
    in_progress: {
      label: "In Progress",
      color: "bg-[#fff1dd] text-[#de852c]",
    },
    completed: {
      label: "Completed",
      color: "bg-[#e8f5ec] text-[#2d8952]",
    },
  };

  if (task.status && statusMap[task.status]) {
    acts.push({
      id: `status-${task.$id}`,
      title: `Status changed to ${statusMap[task.status].label}`,
      date: task.updatedAt || task.createdAt,
      icon: MdLabelImportantOutline,
      iconColor: statusMap[task.status].color,
    });
  }

  // ✅ SORT (latest first)
  return acts
    .map((act) => ({
      ...act,
      dateFormatted: timeAgo(act.date),
      timestamp: new Date(act.date || 0).getTime(),
    }))
    .sort((a, b) => b.timestamp - a.timestamp);
}
function timeAgo(date?: string | Date) {
  if (!date) return "No date";

  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} mins ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hrs ago`;

  const days = Math.floor(hrs / 24);
  return `${days} days ago`;
}

export const buildFarmList = ({
  farms = [],
  fields = [],
  crops = [],
}: {
  farms?: { [key: string]: string }[];
  fields?: { [key: string]: string }[];
  crops?: { [key: string]: string }[];
}) => {
  return farms.map((farm) => {
    const farmFields = fields.filter((f) => f.farms === farm.$id);

    const fieldIds = farmFields.map((f) => f.$id);

    const farmCrops = crops.filter((c) => fieldIds.includes(c.fields));
    const status =
      farm.status === "active" && farmFields.length > 0 && farmCrops.length > 0
        ? "active"
        : "inactive";
    return {
      id: farm.$id,
      img: farm.farmImage,
      name: farm.farmName,
      location: formatLocation(farm.address) ?? "No location",
      totalFields: farmFields.length,
      totalCrops: farmCrops.length,
      status: status,
    };
  });
};

export const buildPreviousStats = ({
  sales,
  expenses,
  filter,
}: {
  sales: { [key: string]: string }[];
  expenses: { [key: string]: string }[];
  filter: "month" | "year";
}) => {
  const now = new Date();

  let prevStart: Date;
  let prevEnd: Date;

  if (filter === "month") {
    // previous month
    prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    prevEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  } else {
    // previous year
    prevStart = new Date(now.getFullYear() - 1, 0, 1);
    prevEnd = new Date(now.getFullYear() - 1, 11, 31);
  }

  const inRange = (date: string) => {
    const d = new Date(date);
    return d >= prevStart && d <= prevEnd;
  };

  const prevSales = sales.filter((s) => inRange(s.saleDate));
  const prevExpenses = expenses.filter((e) => inRange(e.expenseDate));

  const revenue = prevSales.reduce((a, s) => a + Number(s.amount || 0), 0);
  const expense = prevExpenses.reduce((a, e) => a + Number(e.amount || 0), 0);

  return { revenue, expense };
};
const convertToKg = (quantity: number, unit: string) => {
  switch (unit?.toLowerCase()) {
    case "kg":
      return quantity;

    case "bag":
    case "bags":
      return quantity * 50; // ⚠️ assume 1 bag = 50kg (common in Nigeria)

    case "ton":
    case "tons":
      return quantity * 1000;

    default:
      return quantity; // fallback (safe)
  }
};
export const buildCropPerformance = ({
  crops,
  harvests,
  sales,
  expenses,
}: {
  crops: { [key: string]: string }[];
  harvests: { [key: string]: string }[];
  sales: { [key: string]: string }[];
  expenses: { [key: string]: string }[];
}) => {
  // 👉 Group by cropId using harvests
  const cropMap = new Map<
    string,
    {
      id: string;
      crop: string;
      yield: number;
      revenue: number;
      expense: number;
      profit: number;
    }
  >();

  harvests.forEach((harvest) => {
    const cropId = harvest.crops;

    if (!cropMap.has(cropId)) {
      const crop = crops.find((c) => c.$id === cropId);

      cropMap.set(cropId, {
        id: cropId,
        crop: crop?.cropName || "Unknown",
        yield: 0,
        revenue: 0,
        expense: 0,
        profit: 0,
      });
    }

    const entry = cropMap.get(cropId);

    // ✅ 1. YIELD (convert to kg)
    const qty = Number(harvest.quantity || 0);
    const unit = harvest.unit || "kg";

    entry!.yield += convertToKg(qty, unit);

    // ✅ 2. SALES (linked to harvest)
    const harvestSales = sales?.filter((s) => s.harvests === harvest.$id) ?? [];

    const harvestRevenue = harvestSales.reduce(
      (acc, s) => acc + Number(s.totalAmount || 0),
      0,
    );

    entry!.revenue += harvestRevenue;
  });

  // ✅ 3. EXPENSES (linked to crop)
  cropMap.forEach((entry, cropId) => {
    const cropExpenses = expenses?.filter((e) => e.crops === cropId) ?? [];

    const totalExpenses = cropExpenses.reduce(
      (acc, e) => acc + Number(e.amount || 0),
      0,
    );

    entry.expense = totalExpenses;
    entry!.profit = entry.revenue - totalExpenses;
  });

  return Array.from(cropMap.values());
};
// export const buildCropPerformance = ({
//   crops,
//   harvests,
//   sales,
//   expenses,
// }: {
//   crops: { [key: string]: string }[];
//   harvests: { [key: string]: string }[];
//   sales: { [key: string]: string }[];
//   expenses: { [key: string]: string }[];
// }) => {
//   return crops.map((crop) => {
//     // 🟢 1. HARVESTS FOR THIS CROP
//     const cropHarvests = harvests?.filter((h) => h.crops === crop.$id) ?? [];

//     const harvestIds = cropHarvests.map((h) => h.$id);

//     // 🟢 2. TOTAL YIELD (from harvests)
//     const totalYield = cropHarvests.reduce((acc, h) => {
//       const qty = Number(h.quantity || 0);
//       const unit = h.unit || "kg";

//       return acc + convertToKg(qty, unit);
//     }, 0);

//     // 🟢 3. SALES → must match harvest IDs (NOT crop ID)
//     const cropSales =
//       sales?.filter((s) => harvestIds.includes(s.harvests)) ?? [];

//     const revenue = cropSales.reduce(
//       (acc, s) => acc + Number(s.totalAmount || 0),
//       0,
//     );

//     // 🔴 4. EXPENSES (if tied to crop)
//     const cropExpenses = expenses?.filter((e) => e.crops === crop.$id) ?? [];

//     const totalExpenses = cropExpenses.reduce(
//       (acc, e) => acc + Number(e.amount || 0),
//       0,
//     );

//     // 🟣 5. PROFIT
//     const profit = revenue - totalExpenses;

//     return {
//       id: crop.$id,
//       crop: crop.cropName,
//       yield: totalYield,
//       revenue,
//       profit,
//     };
//   });
// };
