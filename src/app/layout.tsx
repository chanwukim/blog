import "@/styles/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { SITE_CONFIG } from "@/lib/constants";
import type { PropsWithChildren } from "@/lib/types";

import Analytics from "@/components/utils/analytics";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Neue",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
  ],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.title}`,
    default: SITE_CONFIG.title,
  },
  description: SITE_CONFIG.description,
  verification: {
    google: "4oQP_trevE42WBKpMlDz8vUk9MCv5ZmlXECFFyGNv8w",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
