import type { Post } from "@/lib/types";

import Empty from "./empty";
import PostsItem from "./posts-item";

interface PostsProps {
  posts: Post[];
  className?: string;
}

export default function Posts({ posts, className }: PostsProps) {
  if (posts.length === 0) {
    return (
      <div className={className}>
        <Empty />
      </div>
    );
  }

  return (
    <section className={className}>
      <h2 className="sr-only">글 목록</h2>
      {posts.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </section>
  );
}
