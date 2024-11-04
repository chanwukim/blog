import styles from "./post-list-item.module.css";

import Link from "next/link";

import getReadingTime from "@/lib/get-reading-time";
import type { Post } from "@/lib/types";

import TagBadge from "./tag-badge";
import VisuallyHidden from "./visually-hidden";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
  const { title, description, content, publishedAt, tags, slug } = post;
  const { text: readingTime } = getReadingTime(content);

  return (
    <article className={styles.article}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link href={`/post/${slug}`} className={styles.link}>
        <VisuallyHidden>{title} 자세히 보기</VisuallyHidden>
      </Link>
      <div className={styles.meta}>
        <time dateTime={publishedAt}>{publishedAt}</time>
        <span className={styles.divider}>·</span>
        <span>{readingTime}</span>
      </div>
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag}>
              <TagBadge tag={tag} />
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
