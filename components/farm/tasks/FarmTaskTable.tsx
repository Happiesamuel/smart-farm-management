import { FaEllipsisV } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import CropPagination from "../../layout/CropPagination";
interface Tasks {
  id: number;
  task: string;
  assignee: string;
  initials: string;
  due: string;
  priority: string;
  status: string;
  progress: number;
}
const tasks: Tasks[] = [
  {
    id: 1,
    task: "Irrigate Field A",
    assignee: "John Farmer",
    initials: "JF",
    due: "May 29, 2025",
    priority: "High",
    status: "In Progress",
    progress: 60,
  },
  {
    id: 2,
    task: "Apply fertilizer (Maize)",
    assignee: "Mary Jane",
    initials: "MJ",
    due: "May 30, 2025",
    priority: "High",
    status: "Pending",
    progress: 0,
  },
  {
    id: 3,
    task: "Weed Field B",
    assignee: "Peter Obi",
    initials: "PO",
    due: "Jun 01, 2025",
    priority: "Medium",
    status: "Pending",
    progress: 0,
  },
  {
    id: 4,
    task: "Pest control in Field C",
    assignee: "John Farmer",
    initials: "JF",
    due: "May 28, 2025",
    priority: "High",
    status: "Overdue",
    progress: 20,
  },
  {
    id: 5,
    task: "Harvest Tomatoes",
    assignee: "Mary Jane",
    initials: "MJ",
    due: "May 25, 2025",
    priority: "Medium",
    status: "Completed",
    progress: 100,
  },
];

const priorityStyles: Record<string, string> = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-100 text-yellow-700",
};

const statusStyles: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-600",
  Completed: "bg-green-100 text-green-700",
};

export default function FarmTaskTable() {
  return (
    <div>
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead className="bg-gray-50 text-gray-600">
              <tr className="text-left">
                <th className="p-4">Task</th>
                <th className="p-4">Assignee</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Progress</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50 transition">
                  {/* Task */}
                  <td className="p-4 text-dark font-medium">{t.task}</td>

                  {/* Assignee */}
                  <td className="p-4">
                    <div className="flex text-zinc-700 items-start lg:items-center gap-2">
                      <p className="size-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold">
                        {t.initials}
                      </p>
                      {t.assignee}
                    </div>
                  </td>

                  {/* Due Date */}
                  <td
                    className={`p-4 ${
                      t.status === "Overdue"
                        ? "text-red-500 font-medium"
                        : "text-zinc-700"
                    }`}
                  >
                    {t.due}
                  </td>

                  {/* Priority */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${priorityStyles[t.priority]}`}
                    >
                      {t.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${statusStyles[t.status]}`}
                    >
                      {t.status}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            t.status === "Completed"
                              ? "bg-green-600"
                              : "bg-green-700"
                          }`}
                          style={{ width: `${t.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-zinc-700">
                        {t.progress}%
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3 text-gray-500">
                      <MdOutlineEdit className="cursor-pointer hover:text-black" />
                      <FaEllipsisV className="cursor-pointer hover:text-black" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        {/* Mobile View */}
        {/* <div className="md:hidden space-y-3 p-4">
        {tasks.map((t) => (
          <div key={t.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{t.task}</h4>
              <span
                className={`text-xs px-2 py-1 rounded-full ${statusStyles[t.status]}`}
              >
                {t.status}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                {t.initials}
              </div>
              <span className="text-sm">{t.assignee}</span>
            </div>

            <p className="text-xs mt-1">Due: {t.due}</p>

            <div className="flex gap-2 mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${priorityStyles[t.priority]}`}
              >
                {t.priority}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-600 rounded-full"
                  style={{ width: `${t.progress}%` }}
                />
              </div>
              <span className="text-xs">{t.progress}%</span>
            </div>
          </div>
        ))}
      </div> */}
      </div>
      <CropPagination>
        <p className="text-xs w-full pt-4 text-gray-500">
          Showing 1 to 5 of 5 tasks
        </p>
      </CropPagination>
    </div>
  );
}
