"use client";

import { ThemeProvider } from "next-themes";

import type { PropsWithChidren } from "@/types";

export default function Providers({ children }: PropsWithChidren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
