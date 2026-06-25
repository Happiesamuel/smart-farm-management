import { format } from "date-fns";

export const normalizeTasks = (
  tasks: { [key: string]: string }[],
  fields: { [key: string]: string }[],
  farms: { [key: string]: string }[],
) => {
  const fieldMap = new Map(fields?.map((f) => [f.$id, f]));
  const farmMap = new Map(farms?.map((f) => [f.$id, f]));

  return tasks.map((t) => {
    const field = fieldMap.get(t.fields);
    const farm = farmMap.get(t.farms);
    return {
      id: t.$id,
      title: t.taskTitle,
      field: field?.fieldName ?? "Unknown Field",
      farm: farm?.farmName ?? "Unknown Farm",

      status:
        t.status === "in_progress"
          ? "In Progress"
          : t.status.charAt(0).toUpperCase() + t.status.slice(1),

      priority: t.priority.charAt(0).toUpperCase() + t.priority.slice(1),

      date: t.dueDate,
      time: format(new Date(t.dueDate), "MMM d"),
    };
  });
};
export const groupTasks = (tasks: { [key: string]: string }[]) => {
  const now = new Date();

  const grouped: Record<string, { [key: string]: string }[]> = {
    today: [],
    upcoming: [],
    overdue: [],
    completed: [],
  };

  tasks.forEach((task) => {
    const d = new Date(task.date);

    const isToday = d.toDateString() === now.toDateString();
    const isPast = d < now && !isToday;
    const isFuture = d > now;

    if (task.status === "Completed") {
      grouped.completed.push(task);
    } else if (isToday) {
      grouped.today.push(task);
    } else if (isPast) {
      grouped.overdue.push(task);
    } else if (isFuture) {
      grouped.upcoming.push(task);
    }
  });

  return grouped;
};

export const buildWorkerStats = (tasks: { [key: string]: string }[] = []) => {
  const now = new Date();

  if (!tasks.length) {
    return {
      assigned: 0,
      pending: 0,
      completedToday: 0,
      completedTotal: 0,
      activeFields: 0,
      attendance: 0,
    };
  }

  // 🔹 normalize status
  const normalizeStatus = (s: string) =>
    s === "in_progress" ? "in_progress" : s?.toLowerCase();

  const assigned = tasks.length;

  const pending = tasks.filter((t) => {
    const s = normalizeStatus(t.status);
    return s === "pending" || s === "in_progress";
  }).length;

  const completedTasks = tasks.filter(
    (t) => normalizeStatus(t.status) === "completed",
  );

  // ✅ completed today
  const completedToday = completedTasks.filter((t) => {
    const d = new Date(t.updatedAt || t.dueDate);
    return d.toDateString() === now.toDateString();
  }).length;

  // 🔥 unique fields user is working on
  const activeFields = new Set(
    tasks
      .filter((t) => normalizeStatus(t.status) !== "completed")
      .map((t) => t.fields),
  ).size;

  // 📊 attendance = completion rate
  const attendance =
    assigned > 0 ? Math.round((completedTasks.length / assigned) * 100) : 0;

  return {
    assigned,
    pending,
    completedToday,
    completedTotal: completedTasks.length,
    activeFields,
    attendance,
  };
};
