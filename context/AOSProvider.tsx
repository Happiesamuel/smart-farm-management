"use client";
import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // animation runs once
      easing: "ease-in-out",
    });
  }, []);

  return <>{children}</>;
}
