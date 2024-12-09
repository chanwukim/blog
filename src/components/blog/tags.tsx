import styles from "./tags.module.css";

import Link from "next/link";

import Tag from "./tag";

interface TagsProps {
  tags: string[];
  activeTag?: string;
}

export default function Tags({ tags, activeTag }: TagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/tags/${encodeURIComponent(tag)}`}>
            <Tag name={tag} active={activeTag === tag} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
