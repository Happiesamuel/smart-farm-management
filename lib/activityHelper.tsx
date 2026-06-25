import {
  CheckCircle,
  PlayCircle,
  FileText,
  Trash2,
  Edit,
  Plus,
  LucideIcon,
  UserPlus,
} from "lucide-react";

export const mapActivityToUI = (
  activity: { [key: string]: string },
  usersMap?: Map<string, { [key: string]: string }>,
) => {
  const user = usersMap?.get(activity.users);

  const base = {
    id: activity.$id,
    details: activity.message,
    time: new Date(activity.$createdAt).toLocaleString(),
    by: user?.name || "Unknown",
    rawDate: activity.$createdAt,
  };

  // 🔥 Smart mapping
  if (activity.action === "created") {
    return {
      ...base,
      type: "created",
      title: "Created",
    };
  }

  if (activity.action === "updated") {
    return {
      ...base,
      type: "updated",
      title: "Updated",
    };
  }

  if (activity.action === "deleted") {
    return {
      ...base,
      type: "deleted",
      title: "Deleted",
    };
  }

  if (activity.action === "started") {
    return {
      ...base,
      type: "started",
      title: "Task Started",
    };
  }

  if (activity.action === "completed") {
    return {
      ...base,
      type: "completed",
      title: "Task Completed",
    };
  }
  if (activity.action === "assigned") {
    return {
      ...base,
      type: "assigned",
      title: "Task Assigned",
    };
  }

  return {
    ...base,
    type: "note",
    title: "Activity",
  };
};

export const activityConfig: Record<
  string,
  { icon: LucideIcon; color: string; bg: string }
> = {
  completed: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  started: {
    icon: PlayCircle,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  created: {
    icon: Plus,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  updated: {
    icon: Edit,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  deleted: {
    icon: Trash2,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  note: {
    icon: FileText,
    color: "text-gray-600",
    bg: "bg-gray-100",
  },
  assigned: {
    icon: UserPlus,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
};
