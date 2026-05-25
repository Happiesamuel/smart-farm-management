"use client";
import { WorkspaceForm } from "@/components/auth/WorkpaceForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const id =
    typeof window !== "undefined"
      ? localStorage.getItem("manager-id") || ""
      : "";
  const router = useRouter();
  if (!id) router.push("/select-workspace");
  return (
    <div className="flex flex-1 overflow-scroll no-scroll   lg:max-h-[91vh] pt-20 relative items-center justify-start  flex-col">
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="bg-primary-green/10 size-16 text-2xl flex items-center justify-center rounded-full">
          🌿
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
            Create your workspace
          </h3>
          <p className="text-sm lg:text-base text-zinc-500 font-normal">
            Create your workspace to manage your farms and workers
          </p>
        </div>
      </div>

      <div className=" mx-auto max-w-[96%] md:max-w-[70%] w-full">
        <WorkspaceForm id={id} />
      </div>
    </div>
  );
}
