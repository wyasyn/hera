"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function HeroWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <section
      className={cn(
        "min-h-dvh  ",
        theme === "dark" ? "dark-gradient" : "light-gradient"
      )}
    >
      {children}
    </section>
  );
}
