import RolesBox from "@/components/manager-settings/user-and-roles/RolesBox";
import UserTable from "@/components/manager-settings/user-and-roles/UserTable";
import { Button } from "@/components/ui/button";
import React from "react";
import { GoPlus } from "react-icons/go";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Users & Roles</h6>
          <p className="text-dark/80 text-sm">
            Manage users, their roles and permission.
          </p>
        </div>
        <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white rounded-sm">
          <GoPlus />
          <p>Add User</p>
        </Button>
      </div>

      <UserTable />
      <RolesBox />
    </div>
  );
}
