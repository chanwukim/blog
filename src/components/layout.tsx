import styles from "./layout.module.css";

import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";
import type { PropsWithChildren } from "@/lib/types";

import GithubIcon from "./icons/github-icon";
import VisuallyHidden from "./visually-hidden";

export function Root({ children }: PropsWithChildren) {
  return (
    <div className={styles.layout}>
      <VisuallyHidden as="h1">{SITE_CONFIG.title}</VisuallyHidden>
      <header className={styles.header}>
        <div>
          <Link href="/" className={styles.logo}>
            {SITE_CONFIG.title}
          </Link>
        </div>
        <div className={styles.actions}></div>
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
