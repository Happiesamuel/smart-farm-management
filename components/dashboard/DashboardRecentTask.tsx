"use client";

import { useState } from "react";
type Priority = "high" | "medium" | "low";
export default function DashboardRecentTask() {
  const [tasks, setTasks] = useState<
    {
      id: number;
      name: string;
      done: boolean;
      priority: Priority;
    }[]
  >([
    { id: 1, name: "Irrigate Field A", done: false, priority: "high" },
    { id: 2, name: "Clear weed", done: false, priority: "low" },
    { id: 2, name: "Apply fertilizer (Rice)", done: false, priority: "medium" },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <div className="bg-gray-50 flex-[0.5] h-full border border-gray-200 p-4 rounded-xl hover:shadow-sm transition">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h6 className="text-base font-semibold text-dark">
          Today&apos;s Tasks
        </h6>

        <span className="text-xs cursor-pointer rounded-full px-3 py-1 text-white bg-gray-800 hover:bg-black transition">
          View
        </span>
      </div>

      {/* TASK LIST */}
      <div className="space-y-1 mt-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition"
          >
            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="accent-green-600 cursor-pointer"
            />

            {/* PRIORITY DOT */}
            <span
              className={`w-2 h-2 rounded-full ${priorityColor[task.priority]}`}
            />

            {/* TASK TEXT */}
            <p
              className={`text-sm transition-all duration-300 ${
                task.done
                  ? "line-through text-gray-400 opacity-70"
                  : "text-gray-800"
              }`}
            >
              {task.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
