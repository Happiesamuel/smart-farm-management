"use client";
import { createContext, ReactNode, useContext, useState } from "react";

const SidebarCollasibleContext = createContext<{
  collaspe: boolean;
  handleToogleCollapse(): void;
}>({
  collaspe: false,
  handleToogleCollapse: () => null,
});
export default function SidebarCollasibleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collaspe, setCollapse] = useState(false);
  function handleToogleCollapse() {
    setCollapse(!collaspe);
  }
  return (
    <SidebarCollasibleContext.Provider
      value={{ handleToogleCollapse, collaspe }}
    >
      {children}
    </SidebarCollasibleContext.Provider>
  );
}
export function useCollaspe() {
  const context = useContext(SidebarCollasibleContext);
  if (context === undefined) throw new Error("wrong position");
  return context;
}
