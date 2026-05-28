"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useGetUser } from "@/hooks/useGetSession";
import WorkspaceList from "@/components/auth/WorkspaceList";
import GeneralLoader from "@/components/loader/GeneralLoader";
// export const metadata = {
//   title: "Select Workspace",
// };
export default function Page() {
  const { data, userStat } = useGetUser();

  if (userStat === "pending") {
    return <GeneralLoader>Loading Workspace...</GeneralLoader>;
  }

  return (
    <div className="mx-auto max-w-[90%] bg-white w-full ">
      <div className="flex flex-col sm:flex-row gap-2 lg:items-center justify-between pt-20">
        <div className="space-y-1 ">
          <h6 className="text-2xl font-semibold text-dark">Select Workspace</h6>
          <p className="text-sm text-zinc-500 font-normal">
            You can only access one workspace at a time.
          </p>
        </div>
        <Button
          onClick={() => localStorage.setItem("manager-id", data!.id)}
          className="bg-transparent border border-dark/15 h-10 px-6  cursor-pointer text-dark/90"
        >
          <Link
            onClick={() => localStorage.setItem("manager-id", data!.id)}
            href={`/create-workspace`}
            className="flex items-center gap-1"
          >
            <GoPlus />
            <p>Create New Workspace</p>
          </Link>
        </Button>
      </div>

      <div className="h-[75vh] overflow-scroll no-scroll space-y-4">
        <WorkspaceList userId={data!.id} />
        <div className="bg-[#f5f8f3]  mt-4 bottom-4 mx-auto  w-full border border-border p-6 rounded-lg flex items-center gap-3">
          <IoShieldCheckmarkOutline className="text-primary-green text-5xl" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
            <div className="space-y-1">
              <p className="text-base text-dark font-normal">
                For security, you can only access one workspace at a time
              </p>
              <p className="text-sm text-zinc-500 font-normal">
                To switch workspace, please sign out first.
              </p>
            </div>
            <p className="text-primary-green">Learn more</p>
          </div>
        </div>
      </div>
    </div>
  );
}
