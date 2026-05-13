import { CheckCircle, PlayCircle, FileText, Image } from "lucide-react";
import ActivityPagination from "./ActivityPagination";
import { IconType } from "react-icons";

const activities = [
  {
    id: 1,
    type: "completed",
    title: "Task Completed",
    details: 'Completed task "Check drip system"',
    field: "Field A",
    time: "May 20, 6:30 AM",
    by: "You",
  },
  {
    id: 2,
    type: "started",
    title: "Task Started",
    details: 'Started task "Irrigate Field A"',
    field: "Field A",
    time: "May 20, 7:05 AM",
    by: "You",
  },
  {
    id: 3,
    type: "completed",
    title: "Task Completed",
    details: 'Completed task "Harvest lettuce"',
    field: "Field B",
    time: "May 19, 9:15 AM",
    by: "You",
  },
  {
    id: 4,
    type: "started",
    title: "Task Started",
    details: 'Started task "Apply fertilizer"',
    field: "Field B",
    time: "May 19, 9:00 AM",
    by: "You",
  },
  {
    id: 5,
    type: "note",
    title: "Note Added",
    details: 'Added note: "Plants look healthy"',
    field: "Field C",
    time: "May 18, 4:20 PM",
    by: "You",
  },
  {
    id: 6,
    type: "photo",
    title: "Photo Uploaded",
    details: "Uploaded a new photo",
    field: "Field A",
    time: "May 18, 3:45 PM",
    by: "You",
  },
];

const activityConfig: Record<
  string,
  { icon: IconType; color: string; bg: string }
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
  note: {
    icon: FileText,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  photo: {
    icon: Image,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
};

export default function ActivityTable() {
  return (
    <div className="w-full bg-white border rounded-xl overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-4">Activity</th>
              <th className="text-left px-4 py-4">Details</th>
              <th className="text-left px-4 py-4">Field</th>
              <th className="text-left px-4 py-4">Time</th>
              <th className="text-left px-4 py-4">By</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((a) => {
              const config = activityConfig[a.type];
              const Icon = config.icon;

              return (
                <tr key={a.id} className="border-t hover:bg-gray-50 transition">
                  {/* Activity */}
                  <td
                    title={a.title}
                    className="px-4 py-3  flex items-center gap-2"
                  >
                    <span className={`p-1.5 rounded-full ${config.bg}`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </span>
                    <span className="font-medium max-w-[120px] truncate text-gray-800">
                      {a.title}
                    </span>
                  </td>

                  {/* Details */}
                  <td
                    title={a.details}
                    className="px-4 py-3 max-w-[120px] truncate text-gray-600 max-w-[250px] truncate"
                  >
                    {a.details}
                  </td>

                  {/* Field */}
                  <td
                    title={a.field}
                    className="px-4 py-3 max-w-[120px] truncate text-gray-700"
                  >
                    {a.field}
                  </td>

                  {/* Time */}
                  <td
                    title={a.time}
                    className="px-4 py-3 max-w-[120px] truncate text-gray-600"
                  >
                    {a.time}
                  </td>

                  {/* By */}
                  <td
                    title={a.by}
                    className="px-4 py-3 max-w-[120px] truncate text-gray-600"
                  >
                    {a.by}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ActivityPagination />
    </div>
  );
}
