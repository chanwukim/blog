import type { Post } from "@/lib/types";

import Empty from "./empty";
import PostListItem from "./post-list-item";
import VisuallyHidden from "./visually-hidden";

interface PostListProps {
  posts: Post[];
  className?: string;
}

export default function PostList({ posts, className }: PostListProps) {
  if (posts.length === 0) {
    return (
      <section className={className}>
        <Empty />
      </section>
    );
  }

  return (
    <section className={className}>
      <VisuallyHidden as="h2">글 목록</VisuallyHidden>
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </section>
  );
}
