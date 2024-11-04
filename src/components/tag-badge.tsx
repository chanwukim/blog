import styles from "./tag-badge.module.css";

interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return <span className={styles.tag}>#{tag}</span>;
}
