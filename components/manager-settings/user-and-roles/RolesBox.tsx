import React from "react";

export default function RolesBox() {
  const roles = [
    {
      name: "Farm Manager",
      role: "Full access off all features and settings.",
    },
    {
      name: "Field Manager",
      role: "Manages fields, crops, tables and harvest.",
    },
    {
      name: "Worker",
      role: "View tasks and update progress.",
    },
    {
      name: "Accountant",
      role: "Manage sales, expenses and financial reports.",
    },
  ];
  return (
    <div className="mt-10">
      <h6 className="text-base font-medium text-dark pb-4">
        Roles & Permissions
      </h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div
            key={role.name}
            className="w-full space-y-2 p-4 cursor-pointer  bg-white  relative rounded-md border border-border/80 hover:shadow-sm transition shrink-0"
          >
            <p className="text-sm text-dark/90 font-medium">{role.name}</p>
            <p
              className="text-[13px] text-zinc-500 font-medium
            "
            >
              {role.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
