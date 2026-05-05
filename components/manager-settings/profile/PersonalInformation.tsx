import React from "react";

export default function PersonalInformation() {
  return (
    <div className="w-full p-4 cursor-pointer  bg-white  relative rounded-md border border-border/80 hover:shadow-sm transition shrink-0">
      <h6 className="text-base text-dark/90 pb-4 font-medium">
        Personal Information
      </h6>

      <div className="space-y-4">
        <div className="grid grid-cols-[7rem_1fr] truncate sm:grid-cols-[10rem_1fr] text-sm text-gray-600">
          <p>Full Name</p>
          <p>John Farmer</p>
        </div>
        <div className="grid grid-cols-[7rem_1fr] truncate sm:grid-cols-[10rem_1fr] text-sm text-gray-600">
          <p>Email</p>
          <p>johnfarmer@example.com</p>
        </div>
        <div className="grid grid-cols-[7rem_1fr] truncate sm:grid-cols-[10rem_1fr] text-sm text-gray-600">
          <p>Phone</p>
          <p>+234 90 654 6113</p>
        </div>
        <div className="grid grid-cols-[7rem_1fr] truncate sm:grid-cols-[10rem_1fr] text-sm text-gray-600">
          <p>Role</p>
          <p>Farm Manager</p>
        </div>
        <div className="grid grid-cols-[7rem_1fr] truncate sm:grid-cols-[10rem_1fr] text-sm text-gray-600">
          <p>Joined On</p>
          <p>Jan 15,2024</p>
        </div>
      </div>
    </div>
  );
}
