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
                <a
                  target="_blank"
                  href={`https://github.com/${SITE_CONFIG.author.name}`}
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center text-foreground hover:bg-background-muted"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mt-0.5"
                  >
                    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <Link
                  href="/"
                  className="px-1 py-2 text-sm hover:bg-background-muted hover:underline"
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
