import Image from "next/image";
import Link from "next/link";

import cn from "@/lib/cn";

import SITE_CONFIG from "@/constants/site-config";

import type { PropsWithChidren } from "@/types";

import ThemeToggle from "../theme-toggle";

export const HEADER_HEIGHT = "h-16";
export const CONTENT_MARGIN_TOP = "md:mt-8";
export const SIDEBAR_TOP = "top-24";

export function GlobalHeader() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background px-4">
      <div
        className={cn(
          "mx-auto grid h-16 grid-cols-[1fr_minmax(auto,55%)_1fr] items-center border-b",
          HEADER_HEIGHT,
        )}
      >
        {/* left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              alt="profile image"
              src={SITE_CONFIG.author.image}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="ml-1 text-xs font-bold">{SITE_CONFIG.author.name}</span>
          </Link>
        </div>

        {/* center */}
        <div></div>

        {/* right */}
        <div className="flex items-center justify-end">
          <div>
            <ThemeToggle />
          </div>

          <nav>
            <h1 className="sr-only">네비게이션</h1>
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href="/me"
                  className="px-2 py-2 text-sm hover:bg-background-muted hover:underline"
                >
                  me
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="px-2 py-2 text-sm hover:bg-background-muted hover:underline"
                >
                  blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function PageLayout({ children }: PropsWithChidren) {
  return (
    <div
      className={cn(
        "flex-1 gap-4 px-4 md:grid md:grid-cols-[1fr_minmax(auto,55%)_1fr]",
        CONTENT_MARGIN_TOP,
      )}
    >
      {children}
    </div>
  );
}

export function PageLayoutSidebar({ children }: PropsWithChidren) {
  return <div className="relative hidden md:block">{children}</div>;
}

export function PageLayoutContent({ children }: PropsWithChidren) {
  return <main className="flex flex-1 flex-col">{children}</main>;
}

export function GlobalFooter() {
  return (
    <footer className="pb-20 pt-10">
      <div className="flex items-center justify-center">
        <span className="text-mute text-xs">
          {`© ${new Date().getFullYear()}`} {SITE_CONFIG.author.name}
        </span>
      </div>
    </footer>
  );
}
