import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { SITE_CONFIG } from "@/constants";

import { ThemeChanger } from "./theme-toggle";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
      <header className="w-full bg-background">
        <div className="mx-auto flex items-center justify-between px-4 py-5">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                alt="profile image"
                src={SITE_CONFIG.author.image}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="ml-2 text-sm font-bold">{SITE_CONFIG.author.name}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <div>
              <ThemeChanger />
            </div>
            <nav>
              <ul className="flex gap-2.5">
                <li>
                  <Link
                    href="/"
                    className="px-1 py-2 text-sm hover:bg-background-muted hover:underline"
                  >
                    home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="px-1 py-2 text-sm hover:bg-background-muted hover:underline"
                  >
                    about
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4">{children}</main>

      <footer className="pb-20 pt-10">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-mute text-xs">
            {`© ${new Date().getFullYear()}`} {SITE_CONFIG.author.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
