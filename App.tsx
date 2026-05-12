"use client";
import React, { ReactNode } from "react";
import Header from "./components/layout/Header";
import { useCollaspe } from "./context/SidebarCollasibleContext";
import { ManagerSidebar, WorkerSidebar } from "./components/layout/Sidebar";

export default function App({ children }: { children: ReactNode }) {
  const { collaspe } = useCollaspe();
  return (
    <div className="flex max-w-480 mx-auto my-0">
      <div
        className={`grid grid-cols-1 transition-all duration-300 ease-in-out ${collaspe ? "lg:grid-cols-[4.8rem_1fr] xl:grid-cols-[4.8rem_1fr]" : "lg:grid-cols-[12.5rem_1fr] xl:grid-cols-[14rem_1fr]"}  w-full`}
      >
        <div className="hidden w-full lg:block">
          <ManagerSidebar />
          {/* <WorkerSidebar /> */}
        </div>

        <div className="flex w-full bg-zinc-50  min-h-screen h-full pb-10 flex-col relative min-w-0">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
