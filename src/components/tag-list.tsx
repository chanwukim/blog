import styles from "./tag-list.module.css";

import Link from "next/link";

import TagBadge from "./tag-badge";

interface TagListProps {
  tags: string[];
  currentTag?: string;
  className?: string;
}

export default function TagList({ tags, currentTag, className }: TagListProps) {
  return (
    <section className={className}>
      <h2 className={styles.title}>태그 {currentTag && `: ${currentTag}`}</h2>
      <ul className={styles.list}>
        <li>
          <Link href="/">
            <TagBadge tag="All" />
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/tag/${encodeURIComponent(tag)}`}>
              <TagBadge tag={tag} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
