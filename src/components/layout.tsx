import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { SITE_CONFIG } from "@/constants";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-[1000] w-full bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
          <h1>
            <Link href="/" className="flex items-center">
              <Image
                alt="profile image"
                src={SITE_CONFIG.author.image}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-md ml-2">{SITE_CONFIG.author.name}</span>
            </Link>
          </h1>

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

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-28">
        {children}
      </main>

      <footer>
        <div className="flex items-center justify-center space-x-3 pb-20">
          <span className="text-mute text-xs">
            {`© ${new Date().getFullYear()}`} {SITE_CONFIG.author.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
