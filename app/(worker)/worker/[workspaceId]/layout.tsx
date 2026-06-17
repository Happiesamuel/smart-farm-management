import NextTopLoader from "nextjs-toploader";
import React from "react";
import "../../../globals.css";
import App from "@/App";
import SidebarCollasibleProvider from "@/context/SidebarCollasibleContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import LayoutApp from "@/LayoutApp";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <NextTopLoader color="#66bb6a" height={4} showSpinner={false} />
      <LayoutApp>
        <SidebarCollasibleProvider>
          <TooltipProvider>
            <App>{children}</App>
          </TooltipProvider>
        </SidebarCollasibleProvider>
      </LayoutApp>
    </div>
  );
}
