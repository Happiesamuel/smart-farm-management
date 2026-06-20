"use client";
import Image from "next/image";
import Not from "../public/error.png";
import { Button } from "@/components/ui/button";
import { IoHomeOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useApp } from "@/stores/useAppStore";
import { useRouter } from "next/navigation";

export default function Error() {
  const { workspace, role } = useApp();
  const router = useRouter();
  return (
    <div className="bg-[#fffbfc] w-full ">
      <div className="w-[95%] md:w-[80%] min-h-screen py-4 mx-auto flex  flex-col justify-between gap-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="size-9 text-xl sm:text-2xl md:text-3xl rounded-xl btn-primary flex items-center justify-center text-white ">
              🌿
            </div>
            <div>
              <div
                className={`font-bold text-gray-900 leading-tight text-sm  `}
              >
                SmartFarm
              </div>
              <div className={`  text-xs text-gray-500 leading-tight`}>
                Management System
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-dark/90">
            <IoHomeOutline className="text-lg" />
            <Link href={"/"}>Go Home</Link>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col gap-3">
          <div className="relative size-[80%] md:size-[60%] lg:size-[50%] aspect-video">
            <Image
              src={Not}
              className="object-center object-cover"
              fill
              alt="not-found"
            />
          </div>
          <div className="flex items-center flex-col justify-center gap-2">
            <h3 className="text-xl md:text-3xl text-dark/90 font-semibold ">
              Something went wrong
            </h3>
            <p className="text-center text-sm text-zinc-400">
              An unexpected error occured. Please try again later.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button className="px-5 h-10 cursor-pointer text-white bg-[#38784f] text-sm flex items-center gap-2">
              <Link
                className="flex items-center gap-2"
                href={
                  workspace && role
                    ? `/${role === "owner" ? "user" : "worker"}/${workspace.workspaceId}/dashboard`
                    : "/"
                }
              >
                <IoHomeOutline />
                <p>Back to Dashboard</p>
              </Link>
            </Button>
            <Button
              onClick={() => router.back()}
              className="px-5 h-10 cursor-pointer text-dark/90 bg-transparent text-sm border-border/80 border"
            >
              Go Back
            </Button>
          </div>

          <div className="flex mx-auto mt-3 w-fit items-start border border-border gap-3 bg-[#fef5f4] p-4 rounded-md">
            <BiSupport className="text-lg text-primary-green" />
            <div className="space-y-1 text-sm">
              <p className="text-dark/90 font-semibold">Need help?</p>
              <p className="text-zinc-400 font-normal">
                Our team has been notified and is working to fix the issue
              </p>
              <div className="flex items-center gap-2 text-red-500 font-medium">
                <p>Contact Support</p>
                <FaArrowRightLong />
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}
