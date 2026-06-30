type InsightIcon =
  | "health"
  | "priority"
  | "crop"
  | "money"
  | "worker"
  | "bot"
  | "harvest"
  | "field"
  | "farm"
  | "expense"
  | "sales"
  | "task"
  | "growth";

type InsightColor = "green" | "orange" | "blue" | "purple" | "gray" | "red";

type Insight = {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  icon: InsightIcon;
  color: InsightColor;
};

export function buildDashboardInsights({
  farms,
  fields,
  crops,
  tasks,
  harvests,
  sales,
  expenses,
  users,
  activities,
}: {
  farms: { [key: string]: string }[];
  fields: { [key: string]: string }[];
  crops: { [key: string]: string }[];
  tasks: { [key: string]: string }[];
  harvests: { [key: string]: string }[];
  sales: { [key: string]: string }[];
  expenses: { [key: string]: string }[];
  users?: { [key: string]: string }[];
  activities?: { [key: string]: string }[];
}): Insight[] {
  const hasNoData =
    !farms?.length &&
    !fields?.length &&
    !crops?.length &&
    !tasks?.length &&
    !harvests?.length &&
    !sales?.length &&
    !expenses?.length;

  if (hasNoData) {
    return [
      {
        id: 1,
        title: "Get Started",
        value: "Welcome",
        subtitle: "Add a farm, field, or crop to see insights here.",
        icon: "bot",
        color: "gray",
      },
    ];
  }

  const insights: Insight[] = [];
  let idCounter = 1;
  const nextId = () => idCounter++;

  const overdueTasks = tasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < new Date(),
  );

  const idleFields = fields.filter(
    (f) => !crops.some((c) => c.fields === f.$id),
  );

  const totalRevenue = sales.reduce(
    (a, b) => a + Number(b.totalAmount || 0),
    0,
  );
  const totalExpense = expenses.reduce((a, b) => a + Number(b.amount || 0), 0);
  const profit = totalRevenue - totalExpense;

  // 1. Farm Health — only if there's enough data to calculate it meaningfully
  if (farms.length > 0 || fields.length > 0 || tasks.length > 0) {
    let health = 100;
    health -= overdueTasks.length * 4;
    health -= idleFields.length * 5;
    if (totalExpense > totalRevenue) health -= 10;
    if (crops.length > 0 && overdueTasks.length === 0) health += 5;
    health = Math.max(0, Math.min(100, health));

    insights.push({
      id: nextId(),
      title: "Farm Health",
      value: `${health}%`,
      subtitle:
        health > 80 ? "Excellent" : health > 60 ? "Stable" : "Needs attention",
      icon: "health",
      color: health > 80 ? "green" : health > 60 ? "orange" : "red",
    });
  }

  // 2. Active Farms
  // Active Farms
  const activeFarmIds = new Set<string>();

  // Farms with active crops
  crops.forEach((crop) => {
    if (crop.status !== "harvested") {
      activeFarmIds.add(crop.farms);
    }
  });

  // Farms with unfinished tasks
  tasks.forEach((task) => {
    if (task.status !== "completed") {
      activeFarmIds.add(task.farms);
    }
  });

  // Farms with sales
  sales.forEach((sale) => {
    activeFarmIds.add(sale.farms);
  });

  // Farms with harvests
  harvests.forEach((harvest) => {
    activeFarmIds.add(harvest.farms);
  });

  // Optional: farms with expenses
  expenses.forEach((expense) => {
    activeFarmIds.add(expense.farms);
  });

  const activeFarmCount = activeFarmIds.size;

  insights.push({
    id: nextId(),
    title: "Active Farms",
    value: `${activeFarmCount} / ${farms.length}`,
    subtitle:
      activeFarmCount === farms.length
        ? "All farms currently have activity"
        : `${farms.length - activeFarmCount} farm${farms.length - activeFarmCount !== 1 ? "s are" : " is"} currently inactive`,
    icon: "farm",
    color: activeFarmCount > 0 ? "green" : "gray",
  });
  // 3. Crop Diversity
  if (crops.length > 0) {
    const cropTypes = new Set(crops.map((x) => x.cropName));
    insights.push({
      id: nextId(),
      title: "Crop Diversity",
      value: String(cropTypes.size),
      subtitle: `Different crop variet${cropTypes.size !== 1 ? "ies" : "y"}`,
      icon: "crop",
      color: "green",
    });
  }

  // 4. Upcoming Harvest (within 20 days)

  let overdueHarvests: typeof crops = [];
  let upcomingHarvests: typeof crops = [];

  const activeCrops = crops.filter(
    (crop) =>
      crop.status !== "harvested" &&
      crop.expectedHarvestDate &&
      !Number.isNaN(new Date(crop.expectedHarvestDate).getTime()),
  );

  if (activeCrops.length) {
    const nextHarvest = [...activeCrops].sort(
      (a, b) =>
        new Date(a.expectedHarvestDate).getTime() -
        new Date(b.expectedHarvestDate).getTime(),
    )[0];

    const daysRemaining = Math.ceil(
      (new Date(nextHarvest.expectedHarvestDate).getTime() - Date.now()) /
        86400000,
    );

    upcomingHarvests = activeCrops.filter((crop) => {
      // 👈 assign, don't redeclare
      const days = Math.ceil(
        (new Date(crop.expectedHarvestDate).getTime() - Date.now()) / 86400000,
      );
      return days >= 0 && days <= 20;
    });

    overdueHarvests = activeCrops.filter((crop) => {
      // 👈 assign, don't redeclare
      const days = Math.ceil(
        (new Date(crop.expectedHarvestDate).getTime() - Date.now()) / 86400000,
      );
      return days < 0;
    });

    let subtitle = "";

    if (daysRemaining < 0) {
      subtitle = `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) > 1 ? "s" : ""} overdue`;
    } else if (daysRemaining === 0) {
      subtitle = "Ready for harvest today";
    } else {
      subtitle = `${daysRemaining} day${daysRemaining > 1 ? "s" : ""} remaining`;
    }

    insights.push({
      id: nextId(),
      title: "Next Harvest",
      value: nextHarvest.cropName,
      subtitle,
      icon: "harvest",
      color: daysRemaining < 0 ? "orange" : "green",
    });

    insights.push({
      id: nextId(),
      title: "Upcoming Harvests",
      value: `${upcomingHarvests.length}`,
      subtitle:
        overdueHarvests.length > 0
          ? `${overdueHarvests.length} overdue • ${upcomingHarvests.length} due soon`
          : `${upcomingHarvests.length} due within 20 days`,
      icon: "crop",
      color:
        overdueHarvests.length > 0
          ? "orange"
          : upcomingHarvests.length > 0
            ? "green"
            : "gray",
    });
  }
  // 5. Harvest Collected
  function toKg(qty: number, unit: string) {
    switch (unit?.toLowerCase()) {
      case "tons":
      case "ton":
        return qty * 1000;
      case "bags":
      case "bag":
        return qty * 50;
      case "crates":
      case "crate":
        return qty * 25;
      case "kg":
      default:
        return qty;
    }
  }

  if (harvests.length > 0) {
    const harvestedKg = harvests.reduce(
      (a, h) => a + toKg(Number(h.quantity || 0), h.unit as string), // 👈 fixed: b → h, removed stray semicolon
      0,
    );

    insights.push({
      id: nextId(),
      title: "Harvest Collected",
      value: `${harvestedKg.toLocaleString()} kg`,
      subtitle: "Total harvest recorded",
      icon: "harvest",
      color: "green",
    });
  }
  // 6. Idle Fields
  if (fields.length > 0) {
    insights.push({
      id: nextId(),
      title: "Idle Fields",
      value: String(idleFields.length),
      subtitle: idleFields.length ? "Need planting" : "All fields active",
      icon: "field",
      color: idleFields.length ? "orange" : "green",
    });
  }

  // 7. Net Profit
  if (sales.length > 0 || expenses.length > 0) {
    insights.push({
      id: nextId(),
      title: "Net Profit",
      value: `₦${Math.abs(profit).toLocaleString()}`,
      subtitle: profit > 0 ? "Profitable" : "Operating at loss",
      icon: "money",
      color: profit > 0 ? "blue" : "red",
    });
  }

  // 8. Expense Ratio
  if (sales.length > 0 && expenses.length > 0) {
    const expenseRatio =
      totalRevenue === 0 ? 0 : Math.round((totalExpense / totalRevenue) * 100);

    insights.push({
      id: nextId(),
      title: "Expense Ratio",
      value: `${expenseRatio}%`,
      subtitle: "Revenue spent",
      icon: "expense",
      color: expenseRatio < 60 ? "green" : expenseRatio < 90 ? "orange" : "red",
    });
  }

  // 9. Sales Performance
  if (sales.length > 0) {
    insights.push({
      id: nextId(),
      title: "Sales Records",
      value: String(sales.length),
      subtitle: `₦${totalRevenue.toLocaleString()} earned`,
      icon: "sales",
      color: "blue",
    });
  }

  // 10. Task Completion
  if (tasks.length > 0) {
    const completed = tasks.filter((x) => x.status === "completed").length;
    const completion = Math.round((completed / tasks.length) * 100);

    insights.push({
      id: nextId(),
      title: "Task Completion",
      value: `${completion}%`,
      subtitle: `${completed}/${tasks.length} completed`,
      icon: "task",
      color: completion > 80 ? "green" : completion > 50 ? "orange" : "red",
    });
  }

  // 11. Critical Tasks
  if (tasks.length > 0) {
    insights.push({
      id: nextId(),
      title: "Critical Tasks",
      value: String(overdueTasks.length),
      subtitle: overdueTasks.length
        ? "Require attention"
        : "Everything on schedule",
      icon: "priority",
      color: overdueTasks.length ? "red" : "green",
    });
  }

  // 12. Top Worker
  let topWorker = "";
  let topWorkerCount = 0;

  if (users?.length && activities?.length) {
    // Only workers
    const workers = users.filter((u) => u.role === "worker");
    const workerIds = new Set(workers.map((u) => u.id));

    const count: Record<string, number> = {};

    activities.forEach((activity) => {
      if (!activity.users) return;

      // Ignore owners/managers
      if (!workerIds.has(activity.users)) return;

      count[activity.users] = (count[activity.users] || 0) + 1;
    });

    const winner = Object.entries(count).sort((a, b) => b[1] - a[1])[0];

    if (winner) {
      const worker = workers.find((u) => u.id === winner[0]);

      topWorker = worker?.name ?? "Unknown";
      topWorkerCount = winner[1];

      insights.push({
        id: nextId(),
        title: "Top Worker",
        value: topWorker,
        subtitle: `${topWorkerCount} activit${topWorkerCount !== 1 ? "ies" : "y"} completed`,
        icon: "worker",
        color: "purple",
      });
    }
  }
  // 13. Harvesting Crops
  if (crops.length > 0) {
    const harvesting = crops.filter(
      (x) => x.growthStage === "harvesting",
    ).length;

    if (harvesting > 0) {
      insights.push({
        id: nextId(),
        title: "Harvesting Crops",
        value: String(harvesting),
        subtitle: "Currently being harvested",
        icon: "growth",
        color: "green",
      });
    }
  }

  // 14. AI Recommendation — always last, always present if we have any data
  const recommendations: string[] = [];

  if (overdueHarvests.length)
    recommendations.push(
      `Harvest ${overdueHarvests.length} overdue crop${
        overdueHarvests.length > 1 ? "s" : ""
      } immediately.`,
    );

  if (overdueTasks.length)
    recommendations.push(
      `Complete ${overdueTasks.length} overdue task${
        overdueTasks.length > 1 ? "s" : ""
      }.`,
    );

  if (idleFields.length)
    recommendations.push(
      `Plant crops in ${idleFields.length} idle field${
        idleFields.length > 1 ? "s" : ""
      }.`,
    );

  if (profit < 0)
    recommendations.push(
      "Reduce operating expenses or increase produce sales.",
    );

  if (upcomingHarvests.length)
    recommendations.push(
      `Prepare harvesting equipment for ${upcomingHarvests.length} crop${
        upcomingHarvests.length > 1 ? "s" : ""
      } due soon.`,
    );

  if (!recommendations.length)
    recommendations.push(
      "Farm operations look healthy. Continue monitoring crops and team activities.",
    );

  const recommendation = recommendations[0];
  insights.push({
    id: nextId(),
    title: "Farm Recommendation",
    value: "Smart Suggestion",
    subtitle: recommendation,
    icon: "bot",
    color: "gray",
  });

  return insights;
}
