"use client";
import { ReactNode } from "react";
import Header from "./components/layout/Header";
import { useCollaspe } from "./context/SidebarCollasibleContext";
import { ManagerSidebar, WorkerSidebar } from "./components/layout/Sidebar";
import { useInitApp } from "./hooks/useInit";
import { useApp } from "./stores/useAppStore";
import { usePathname } from "next/navigation";

export default function App({ children }: { children: ReactNode }) {
  const { collaspe } = useCollaspe();
  useInitApp();
  const { role } = useApp();
  const pathname = usePathname();
  const ownerPath = pathname.startsWith("/user");
  return (
    <div className="flex max-w-480 mx-auto my-0">
      <div
        className={`grid grid-cols-1 transition-all duration-300 ease-in-out ${collaspe ? "lg:grid-cols-[4.8rem_1fr] xl:grid-cols-[4.8rem_1fr]" : "lg:grid-cols-[12.5rem_1fr] xl:grid-cols-[14rem_1fr]"}  w-full`}
      >
        <div className="hidde w-full lg:block">
          {role === "owner" || ownerPath ? (
            <ManagerSidebar />
          ) : role === "worker" ? (
            <WorkerSidebar />
          ) : (
            ""
          )}
        </div>

        <div className="flex w-full bg-zinc-50  min-h-screen h-full pb-10 flex-col relative min-w-0">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
