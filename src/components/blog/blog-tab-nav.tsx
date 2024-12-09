"use client";

import styles from "./blog-tab-nav.module.css";

import { usePathname } from "next/navigation";

import { TabNav, TabNavItem } from "../ui/tab-nav";

export default function BlogTabNav() {
  const pathname = usePathname();

  const isAboutPage = pathname.startsWith("/about");

  return (
    <TabNav title="블로그 탭" className={styles.tabNav}>
      <TabNavItem href="/" selected={!isAboutPage}>
        Posts
      </TabNavItem>
      <TabNavItem href="/about" selected={isAboutPage}>
        About
      </TabNavItem>
    </TabNav>
  );
}
