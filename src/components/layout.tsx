import styles from "./layout.module.css";

import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";
import { getAllCategories } from "@/lib/post";
import type { PropsWithChildren } from "@/lib/types";

import GithubIcon from "./icons/github-icon";
import MobileMenu from "./mobile-menu";
import VisuallyHidden from "./visually-hidden";

export async function Root({ children }: PropsWithChildren) {
  const categories = await getAllCategories();

  return (
    <div className={styles.layout}>
      <VisuallyHidden as="h1">{SITE_CONFIG.title}</VisuallyHidden>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <Link href="/" className={styles.logo}>
              기록이 쌓이면 <span>뭐든</span> 된다
            </Link>
          </div>
          <div className={styles.actions}>
            <MobileMenu categories={categories} />
          </div>
        </div>
      </header>

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <ul>
          <li>
            <a
              href="https://github.com/chanwukim"
              target="_blank"
              className={styles.externalLink}
            >
              <VisuallyHidden>GitHub</VisuallyHidden>
              <GithubIcon size={18} />
            </a>
          </li>
        </ul>
        <div className={styles.copyright}>
          <Link href={SITE_CONFIG.url}>
            {`© ${new Date().getFullYear()}`} {SITE_CONFIG.author.name}
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function Side({ children }: PropsWithChildren) {
  return (
    <div className={styles.side}>
      <div className={styles.sideContent}>{children}</div>
    </div>
  );
}

export function Main({ children }: PropsWithChildren) {
  return <div className={styles.main}>{children}</div>;
}
