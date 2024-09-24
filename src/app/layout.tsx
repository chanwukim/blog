import "@/styles/globals.css";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import cn from "@/lib/cn";

import Analytics from "@/components/analytics";
import Providers from "@/components/providers";
import Series from "@/components/series/series";
import {
  GlobalFooter,
  GlobalHeader,
  PageLayout,
  PageLayoutSidebar,
  SIDEBAR_TOP,
} from "@/components/ui/layout";

import SITE_CONFIG from "@/constants/site-config";

import type { PropsWithChidren } from "@/types";

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
    template: `%s | ${SITE_CONFIG.author.name} 블로그`,
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

export default function RootLayout({ children }: PropsWithChidren) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${font.className} relative flex min-h-svh w-full flex-col overflow-x-hidden antialiased`}
      >
        <Analytics />
        <Providers>
          <div className="container mx-auto flex flex-1 flex-col">
            <GlobalHeader />
            <PageLayout>
              <PageLayoutSidebar>
                <Series className={cn("sticky", SIDEBAR_TOP)} />
              </PageLayoutSidebar>

              {/* main content + sidebar*/}
              {children}
            </PageLayout>
            <GlobalFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
