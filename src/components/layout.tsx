import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { SITE_CONFIG } from "@/constants";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto min-h-screen max-w-2xl">
      <header className="w-full bg-white">
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

          <ul className="flex gap-2.5">
            <li>
              <Link href="/" className={"px-1 py-2 text-sm"}>
                home
              </Link>
            </li>
            <li>
              <Link href="/about" className="px-1 py-2 text-sm">
                about
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <main className="px-4">{children}</main>

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
