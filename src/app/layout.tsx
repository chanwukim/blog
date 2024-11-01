import "@/styles/globals";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { css } from "@pigment-css/react";

import { SITE_CONFIG } from "@/lib/constants";
import type { PropsWithChildren } from "@/lib/types";

const font = Noto_Sans_KR({
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
    template: `%s | ${SITE_CONFIG.author.name}`,
    default: SITE_CONFIG.title,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: "@chanwu.dev",
    creator: `@${SITE_CONFIG.author.name}`,
  },
  verification: {
    google: "4oQP_trevE42WBKpMlDz8vUk9MCv5ZmlXECFFyGNv8w",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className={`${root} ${font.className}`}>{children}</body>
    </html>
  );
}

const root = css`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${({ theme }) => theme.vars.colors.background};
`;
