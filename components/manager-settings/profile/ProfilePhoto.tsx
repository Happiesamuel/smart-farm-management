import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegUser } from "react-icons/fa6";

export default function ProfilePhoto() {
  return (
    <div className="w-full p-4 cursor-pointer  bg-white  relative rounded-md border border-border/80 hover:shadow-sm transition shrink-0">
      <h6 className="text-base text-dark/90 pb-3 font-medium">Profile Photo</h6>

      <div className="flex sm:items-center gap-4 flex-col">
        <div className="text-3xl mx-auto text-primary-green  border border-dark/15 rounded-full flex items-center justify-center size-22">
          <FaRegUser />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white rounded-sm">
            Change Photo
          </Button>
          <Button className="bg-transparent text-red-500 border border-dark/15 w-[48%] sm:w-fit cursor-pointer 0 rounded-sm">
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
