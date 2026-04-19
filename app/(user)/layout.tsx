import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <div className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}
