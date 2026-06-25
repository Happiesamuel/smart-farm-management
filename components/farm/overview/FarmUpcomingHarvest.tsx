import { NoResult } from "@/components/loader/GeneralLoader";
import { useParams, useRouter } from "next/navigation";
import { GiPlantRoots } from "react-icons/gi";

export default function FarmUpcomingHarvest({
  crops,
  fields,
}: {
  crops: { [key: string]: string }[];
  fields: { [key: string]: string }[];
}) {
  const { farmId, workspaceId } = useParams();
  const router = useRouter();
  const upcomingHarvests =
    crops
      ?.filter((c) => {
        if (!c.expectedHarvestDate) return false;

        const now = new Date();
        const harvestDate = new Date(c.expectedHarvestDate);

        const diffDays =
          (harvestDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        return diffDays >= 0 && diffDays <= 30; // 🔥 next 30 days
      })
      .map((c) => {
        const field = fields.find((f) => f.$id === c.fields);

        const harvestDate = new Date(c.expectedHarvestDate);
        const now = new Date();

        const diffDays = Math.ceil(
          (harvestDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );

        return {
          id: c.$id,
          name: c.cropName,
          field: field?.fieldName ?? "Unknown Field",
          date: harvestDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          time:
            diffDays === 0
              ? "Today"
              : diffDays === 1
                ? "Tomorrow"
                : `In ${diffDays} days`,
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5) ?? [];

  return (
    <div className="w-full p-4 h-[300px] bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      <div className="flex pb-4 items-center justify-between">
        <p className="text-dark text-base font-semibold">Upcoming Harvest</p>
        <p
          onClick={() =>
            router.push(`/user/${workspaceId}/farms/${farmId}?tab=harvests`)
          }
          className="text-sm text-primary-green font-normal"
        >
          View All
        </p>
      </div>

      {!upcomingHarvests.length ? (
        <div className="h-full">
          <NoResult>No upcoming harvest</NoResult>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingHarvests.map((act) => (
            <div key={act.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center size-7 rounded bg-green-100/80 border border-green-200 text-primary-green ">
                  <GiPlantRoots />
                </div>
                <div className="space-y-1">
                  <p className="text-dark/95 text-sm">{act.name}</p>
                  <p className="text-zinc-500 text-xs">{act.field}</p>
                </div>
              </div>

              <div className="space-y-1 text-end">
                <p className="text-primary-green font-semibold text-sm">
                  {act.time}
                </p>
                <p className="text-zinc-500 text-xs">{act.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
