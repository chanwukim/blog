import styles from "./article.module.css";

import { SITE_CONFIG } from "@/lib/constants";
import getReadingTime from "@/lib/get-reading-time";
import markdownToHtml from "@/lib/markdown-to-html";
import type { Post } from "@/lib/types";

import { Avatar } from "../ui/avatar";
import { Title } from "../ui/title";
import MarkdownRenderer from "../utils/markdown-renderer";

import ArticleComments from "./article-comments";
import PostMetadata from "./post-metadata";
import Tags from "./tags";

interface ArticleProps {
  post: Post;
}

export default function Article({ post }: ArticleProps) {
  const { title, publishedAt, tags, content } = post;
  const { text: readingTime } = getReadingTime(content);

  return (
    <>
      <article className={styles.article}>
        <Title as="h1" size="display-2" weight="semibold">
          {title}
        </Title>

        <div className={styles.author}>
          <Avatar
            src="https://avatars.githubusercontent.com/u/105474635?v=4"
            alt="프로필 이미지"
          />
          <div className={styles.info}>
            <div>
              <Title as="span" size="subtitle-2" weight="semibold">
                {SITE_CONFIG.author.name}
              </Title>
            </div>
            <PostMetadata publishedAt={publishedAt} readingTime={readingTime} />
          </div>
        </div>

        <MarkdownRenderer markdown={content} />

        {tags.length > 0 && (
          <div className={styles.tags}>
            <span className="sr-only">{title}의 태그</span>
            <Tags tags={tags} />
          </div>
        )}
      </article>
      <ArticleComments className={styles.comments} />
    </>
  );
}
