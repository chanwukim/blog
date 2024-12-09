import styles from "./footer.module.css";

import Link from "next/link";

import { SITE_CONFIG } from "@/lib/constants";

import GithubIcon from "../icons/github-icon";
import { Text } from "../ui/text";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a
            href={SITE_CONFIG.author.github}
            target="_blank"
            className={styles.externalLink}
          >
            <span className="sr-only">GitHub</span>
            <GithubIcon size={18} />
          </a>
        </li>
      </ul>
      <div className={styles.copyright}>
        <Text as={Link} href={SITE_CONFIG.url} size="body" weight="medium">
          {`© ${new Date().getFullYear()}`} {SITE_CONFIG.author.name}
        </Text>
      </div>
    </footer>
  );
}
