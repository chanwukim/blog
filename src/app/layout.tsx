import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { Analytics } from "@/components/analytics";
import { SITE_CONFIG } from "@/libs/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.TITLE}`,
    default: SITE_CONFIG.TITLE,
  },
  description: SITE_CONFIG.DESCRIPTION,
  verification: {
    google: "4oQP_trevE42WBKpMlDz8vUk9MCv5ZmlXECFFyGNv8w",
  },
  openGraph: {
    title: SITE_CONFIG.TITLE,
    description: SITE_CONFIG.DESCRIPTION,
    url: SITE_CONFIG.URL,
    siteName: SITE_CONFIG.TITLE,
    images: [
      {
        url: `${SITE_CONFIG.URL}/api/og?title=${encodeURIComponent(SITE_CONFIG.TITLE)}&description=${encodeURIComponent(SITE_CONFIG.DESCRIPTION)}&type=default`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.TITLE,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.TITLE,
    description: SITE_CONFIG.DESCRIPTION,
    images: [
      `${SITE_CONFIG.URL}/api/og?title=${encodeURIComponent(SITE_CONFIG.TITLE)}&description=${encodeURIComponent(SITE_CONFIG.DESCRIPTION)}&type=default`,
    ],
  },
};

const pretendard = localFont({
  src: [
    {
      path: "./Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <div className="relative flex min-h-svh flex-col">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
