import styles from "./post-detail.module.css";

import markdownToHtml from "@/lib/markdown-to-html";
import type { Post } from "@/lib/types";

import HtmlRenderer from "./html-renderer";
import PostComments from "./post-comments";

interface PostDetailProps {
  post: Post;
}

export default async function PostDetail({ post }: PostDetailProps) {
  const { title, publishedAt, content } = post;
  const html = await markdownToHtml(content);

  return (
    <>
      <article className={styles.article}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.metadata}>
          <time dateTime={publishedAt}>{publishedAt}</time>
        </div>
        <HtmlRenderer html={html} />
      </article>
      <PostComments className={styles.comments} />
    </>
  );
}
