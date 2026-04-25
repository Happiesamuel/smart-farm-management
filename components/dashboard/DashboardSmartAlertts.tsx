import React from "react";
import { CiBag1 } from "react-icons/ci";
import { GiDigDug } from "react-icons/gi";
import { PiPlant } from "react-icons/pi";

export default function DashboardSmartAlerts() {
  return (
    <div className="pt-4">
      <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-4">
        {/* FIELD ACTIVITIES */}
        <div className="bg-green-50 h-[180px] pb-2  no-scroll overflow-scroll border border-green-200 p-3 rounded-lg hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-base font-semibold text-dark">
                Field Activities
              </h6>
              <p className="text-xs text-gray-500">
                3 active • 1 inactive field
              </p>
            </div>

            <span className="text-xs cursor-pointer rounded-full px-3 py-1 text-white bg-green-500 hover:bg-green-600 transition">
              View
            </span>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 size-6 flex items-center justify-center">
                  <GiDigDug className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm text-zinc-700">
                    3 Active crops growing
                  </p>
                  <p className="text-xs text-gray-400">Updated just now</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-red-500 size-6 flex items-center justify-center">
                  <CiBag1 className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm text-zinc-700">
                    Field B has no activity for 7 days
                  </p>
                  <p className="text-xs text-gray-400">Critical • 7 days ago</p>
                  <p className="text-xs italic text-gray-600">
                    Recommendation: Check and irrigate field
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITIES */}
        <div className="bg-blue-50 h-[180px] pb-2  no-scroll overflow-scroll  border border-blue-200 p-3 rounded-lg hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-base font-semibold text-dark">
                Recent Activities
              </h6>
              <p className="text-xs text-gray-500">Latest farm updates</p>
            </div>

            <span className="text-xs cursor-pointer rounded-full px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 transition">
              View
            </span>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-red-500 size-6 flex items-center justify-center">
                  <GiDigDug className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm text-zinc-700">
                    No irrigation recorded in 5 days
                  </p>
                  <p className="text-xs text-gray-400">Critical • 5 days ago</p>
                  <p className="text-xs italic text-gray-600">
                    Recommendation: Irrigate crops today
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 size-6 flex items-center justify-center">
                  <CiBag1 className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm text-zinc-700">
                    Fertilizer was added 3 days ago
                  </p>
                  <p className="text-xs text-gray-400">Info • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPCOMING HARVEST */}
        <div className="bg-yellow-50  h-[180px] sm:col-span-3 lg:col-span-1 pb-2 no-scroll overflow-scroll border border-yellow-200 p-3 rounded-lg hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-base font-semibold text-dark">
                Upcoming Harvests
              </h6>
              <p className="text-xs text-gray-500">2 crops nearing harvest</p>
            </div>

            <span className="text-xs cursor-pointer rounded-full px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 transition">
              View
            </span>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-yellow-500 size-6 flex items-center justify-center">
                  <PiPlant className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm text-zinc-700">
                    Maize will be ready in 5 days
                  </p>
                  <p className="text-xs text-gray-400">Warning • Upcoming</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 size-6 flex items-center justify-center">
                  <PiPlant className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm text-zinc-700">
                    Wheat was harvested 2 days ago
                  </p>
                  <p className="text-xs text-gray-400">
                    Completed • 2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TASK PREVIEW (NEW 🔥) */}
      </div>
    </div>
  );
}
