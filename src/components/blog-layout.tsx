import Link from "next/link";

import { SITE_CONFIG } from "@/libs/constants";
import GithubIcon from "./icons/github-icon";

export function BlogHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-10 flex backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-screen-lg items-center px-4">
        <Link href="/" className="flex items-center p-2 text-sm font-medium">
          {SITE_CONFIG.TITLE}
        </Link>
      </div>
    </header>
  );
}

export function BlogContent({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-1 justify-evenly py-10">
      {children}
    </div>
  );
}

export function BlogContentMain({ children }: React.PropsWithChildren) {
  return (
    <main className="flex w-full flex-1 flex-col px-4 lg:max-w-3xl">
      {children}
    </main>
  );
}

export function BlogContentAside({ children }: React.PropsWithChildren) {
  return (
    <aside className="hidden w-76 border-l px-6 lg:block">
      <h2 className="sr-only">사이드바</h2>
      {children}
    </aside>
  );
}

export function BlogFooter() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 p-4 pb-10">
      <ul className="text-muted-foreground hover:text-primary flex items-center justify-center p-2">
        <li>
          <a href={SITE_CONFIG.AUTHOR.GITHUB} target="_blank" className="p-2">
            <span className="sr-only">GitHub</span>
            <GithubIcon size={18} />
          </a>
        </li>
      </ul>
      <div>
        <Link href={SITE_CONFIG.URL} className="p-2">
          {`© ${new Date().getFullYear()}`} {SITE_CONFIG.AUTHOR.NAME}
        </Link>
      </div>
    </footer>
  );
}
