"use client";

import styles from "./tags-section.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import cn from "@/lib/cn";

import { Text } from "../ui/text";

import Tag from "./tag";

interface TagsSectionProps {
  tags: string[];
  className?: string;
}

export default function TagsSection({ tags, className }: TagsSectionProps) {
  const pathname = usePathname();
  const tagFromPathname = pathname.split("/tags/").pop();
  const activeTag = tagFromPathname
    ? decodeURIComponent(tagFromPathname)
    : null;

  return (
    <section className={cn(styles.section, className)}>
      <Text as="h3" size="caption" weight="medium" className="color-muted">
        TAG
      </Text>
      <ul className={styles.tags}>
        <li>
          <Link href="/">
            <Tag name="전체" />
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/tags/${encodeURIComponent(tag)}`}>
              <Tag name={tag} active={activeTag === tag} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
