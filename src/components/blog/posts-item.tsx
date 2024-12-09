import styles from "./posts-item.module.css";

import Link from "next/link";

import getReadingTime from "@/lib/get-reading-time";
import type { Post } from "@/lib/types";

import { Title } from "../ui/title";

import PostMetadata from "./post-metadata";
import Tags from "./tags";

interface PostsItemProps {
  post: Post;
}

export default function PostsItem({ post }: PostsItemProps) {
  const { title, description, content, publishedAt, tags, slug } = post;
  const { text: readingTime } = getReadingTime(content);

  return (
    <article className={styles.article}>
      <Title as="h3" size="title-2" weight="semibold" className={styles.title}>
        {title}
      </Title>

      <Title as="p" size="subtitle-2" className={styles.description}>
        {description}
      </Title>

      <div>
        <Link href={`/post/${slug}`} className={styles.link}>
          <span className="sr-only">{title} 읽기</span>
        </Link>
      </div>

      <PostMetadata
        publishedAt={publishedAt}
        readingTime={readingTime}
        className={styles.meta}
      />

      {tags.length > 0 && (
        <div className={styles.tags}>
          <span className="sr-only">{title}의 태그</span>
          <Tags tags={tags} />
        </div>
      )}
    </article>
  );
}
