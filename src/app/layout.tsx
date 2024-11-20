import "@/styles/globals.css";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { SITE_CONFIG } from "@/lib/constants";
import type { PropsWithChildren } from "@/lib/types";

import Analytics from "@/components/analytics";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700", "800"],
  display: "swap",
  subsets: ["latin"],
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
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
