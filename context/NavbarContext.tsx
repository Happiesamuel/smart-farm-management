"use client";
import { createContext, useContext } from "react";
import { useEffect, useRef, useState } from "react";

const NavContext = createContext<{
  activeSection: string;
}>({
  activeSection: "home",
});
const sections = [
  "home",
  "about",
  "features",
  "howitworks",
  "testimonials",
  "faq",
  "contact",
];

export default function NavbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      {
        rootMargin: "0px 0px -60% 0px", // triggers when section is 40% visible from top
        threshold: 0.1,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => {
      sections.forEach((id) => {
        const el = sectionRefs.current[id];
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <NavContext.Provider value={{ activeSection }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (!context) throw Error("undefined");
  return context;
}
