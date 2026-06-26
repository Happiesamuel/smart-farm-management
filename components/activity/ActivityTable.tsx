"use client";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
import { useGetActivity } from "@/hooks/activity/useActivity";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { activityConfig, mapActivityToUI } from "@/lib/activityHelper";
import { useWorkspaceUser } from "@/hooks/useAssign";
import FinancePagination from "@/components/layout/FinancePagination";
import FieldActivityCalendar from "@/components/field/activity/FieldActivityCalendar";

export default function ActivityTable() {
  const searchParams = useSearchParams();

  const { workspace, user, ready } = useApp();
  const {
    users,
    status: userStat,
    error: userErr,
  } = useWorkspaceUser(workspace?.id ?? null);
  const { activity, status, error } = useGetActivity(
    workspace?.id ?? null,
    user?.id ?? null,
  );

  if (!ready)
    return (
      <div className="h-70">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-70">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading = status === "pending" || userStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading activity records...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || userErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  const newAct = activity ?? [];
  if (!newAct?.length)
    return (
      <div className="h-70 flex items-center justify-center">
        <div className="flex items-center flex-col gap-1 ">
          <NoResult>No activity record!</NoResult>
        </div>
      </div>
    );

  console.log(newAct);
  const userMap = new Map(users.map((u) => [u.id, u]));

  const fromParam = searchParams.get("activityFrom");
  const toParam = searchParams.get("activityTo");

  const formattedActivities =
    newAct?.map((a) => mapActivityToUI(a, userMap)) ?? [];

  const filteredActivities = formattedActivities.filter((a) => {
    if (!fromParam && !toParam) return true;

    const date = new Date(a.rawDate);

    if (fromParam) {
      const from = new Date(fromParam);
      from.setHours(0, 0, 0, 0);
      if (date < from) return false;
    }

    if (toParam) {
      const to = new Date(toParam);
      to.setHours(23, 59, 59, 999); // 👈 end of day, not midnight
      if (date > to) return false;
    }

    return true;
  });
  const PAGE_SIZE = 10;
  const currentPage = Number(searchParams.get("activityPage") || 1);
  const paginatedActivity = filteredActivities.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <div className="flex w-full  mb-4">
        <FieldActivityCalendar />
      </div>
      {!paginatedActivity.length ? (
        <div className="h-100">
          <NoResult>No activity record</NoResult>
        </div>
      ) : (
        <div className="w-full bg-white border rounded-xl overflow-hidden">
          <div className="overflow-x-auto no-scroll min-w-full">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="text-left px-4 py-4">Activity</th>
                  <th className="text-left px-4 py-4">Details</th>
                  <th className="text-left px-4 py-4">Time</th>
                  <th className="text-left px-4 py-4">By</th>
                </tr>
              </thead>

              <tbody>
                {paginatedActivity.map((a) => {
                  const config = activityConfig[a.type] || activityConfig.note;
                  const Icon = config.icon;

                  return (
                    <tr
                      key={a.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 flex items-center gap-2">
                        <span className={`p-1.5 rounded-full ${config.bg}`}>
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </span>
                        <span className="font-medium truncate text-gray-800">
                          {a.title}
                        </span>
                      </td>

                      <td
                        title={a.details}
                        className="px-4 py-3 max-w-[200px] text-gray-600 truncate"
                      >
                        {a.details}
                      </td>

                      <td className="px-4 py-3 text-gray-600">{a.time}</td>

                      <td className="px-4 py-3 text-gray-600">{a.by}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <FinancePagination
            type="activities"
            pageSize={PAGE_SIZE}
            total={filteredActivities.length}
            pageKey="activityPage"
          />
        </div>
      )}
    </>
  );
}
