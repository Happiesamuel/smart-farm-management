"use client";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useGetUser } from "@/hooks/useGetSession";
import GeneralLoader from "@/components/loader/GeneralLoader";
import WorkerWorkspaceList from "@/components/auth/WorkerWorkspaceList";
// export const metadata = {
//   title: "Select Workspace",
// };
export default function Page() {
  const { data, userStat } = useGetUser();

  if (userStat === "pending") {
    return <GeneralLoader>Loading Workspace...</GeneralLoader>;
  }

  return (
    <div className="mx-auto max-w-[98%] md:max-w-[90%] bg-white w-full ">
      <div className="flex flex-col space-y-1 sm:flex-row gap-2 lg:items-center justify-between pt-20">
        <h6 className="text-2xl font-semibold text-dark">Select Workspace</h6>
        <p className="text-sm text-zinc-500 font-normal">
          You can only access one workspace at a time.
        </p>
      </div>

      <div className="h-[75vh] overflow-scroll no-scroll space-y-4">
        <WorkerWorkspaceList user={data!} />
        <div className="bg-[#f0782d]/5  mt-4 bottom-4 mx-auto  w-full border border-border p-6 rounded-lg flex items-center gap-3">
          <IoShieldCheckmarkOutline className="text-[#f0782d] md:block hidden text-5xl" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
            <div className="space-y-1">
              <p className="text-base text-dark font-normal">
                For security, you can only access one workspace at a time
              </p>
              <p className="text-sm text-zinc-500 font-normal">
                To switch workspace, please sign out first.
              </p>
            </div>
            <p className="text-[#f0782d]">Learn more</p>
          </div>
        </div>
      </div>
    </div>
  );
}
