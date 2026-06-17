import { NoResult } from "@/components/loader/GeneralLoader";
import { useParams, useRouter } from "next/navigation";
import { PiPlant } from "react-icons/pi";
const stageColor: Record<string, string> = {
  seedling: "bg-yellow-100 text-yellow-600",
  vegetative: "bg-green-100 text-green-600",
  flowering: "bg-blue-100 text-blue-600",
  fruiting: "bg-purple-100 text-purple-600",
  harvesting: "bg-orange-100 text-orange-600",
  idle: "bg-gray-100 text-gray-500",
};
export default function FarmFieldOverview({
  fieldArr,
}: {
  fieldArr: {
    id: string;
    name: string;
    size: string;
    crop: string;
    growthStage: string;
  }[];
}) {
  const { workspaceId, farmId } = useParams();
  const router = useRouter();
  return (
    <div className="w-full p-4 h-[300px]  bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      <div className="flex pb-4 items-center justify-between">
        <p className="text-dark text-base font-semibold">Field Activites</p>
        <p
          onClick={() =>
            router.push(`/user/${workspaceId}/farms/${farmId}?tab=crops`)
          }
          className="text-sm text-primary-green font-normal cursor-pointer"
        >
          View All
        </p>
      </div>

      {!fieldArr.length ? (
        <div className="h-full">
          <NoResult>No Field Activities</NoResult>
        </div>
      ) : (
        <div className="space-y-4 max-h-[310px] overflow-scroll no-scroll">
          {fieldArr.map((act) => (
            <div
              key={act.id}
              className="flex justify-between items-center gap-3.5"
            >
              <div className="flex items-center gap-2">
                <div className="size-7 flex items-center justify-center rounded bg-green-100 border text-primary-green">
                  <PiPlant />
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-dark/90">{act.name}</p>
                  <p className="text-zinc-600 text-xs">{act.size}</p>
                </div>
              </div>

              <div className="flex items-center text-sm gap-5">
                <p className="text-dark/95">{act.crop}</p>

                <p
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    stageColor[act.growthStage]
                  }`}
                >
                  {act.growthStage}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
