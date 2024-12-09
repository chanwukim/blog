"use client";

import styles from "./tab-nav.module.css";

import Link from "next/link";

import cn from "@/lib/cn";
import type { PropsWithChildren } from "@/lib/types";

import { Text } from "./text";

export interface TabNavProps extends PropsWithChildren {
  title: string;

  className?: string;
}

export function TabNav({ title, children, className }: TabNavProps) {
  return (
    <nav className={styles.tabNavWrapper}>
      <h2 className="sr-only">{title}</h2>
      <ul className={cn(styles.tabNav, className)}>{children}</ul>
    </nav>
  );
}

export interface TabNavItemProps extends PropsWithChildren {
  selected?: boolean;
  href: string;
  className?: string;
}

export function TabNavItem({
  selected,
  href,
  children,
  className,
}: TabNavItemProps) {
  return (
    <li
      className={cn(
        styles.tabNavItem,
        selected && styles.active,
        "no-scrollbar",
        className,
      )}
    >
      <Text as={Link} href={href} weight="medium">
        {children}
      </Text>
    </li>
  );
}
