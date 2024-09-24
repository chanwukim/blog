import Link from "next/link";

import type { Post } from "@/types";

import PostMetadata from "./post-metadata";

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

function PostsItem({ post }: { post: Post }) {
  return (
    <li>
      <Link
        href={`/${encodeURIComponent(post.series)}/${encodeURIComponent(post.slug)}`}
        className="block px-1 py-3 transition-[background-color] hover:bg-background-muted active:bg-foreground/10"
      >
        <h2 className="line-clamp-2 overflow-hidden text-ellipsis text-sm font-medium">
          {post.frontMatter.title}
        </h2>
        {post.frontMatter.summary && (
          <p className="mb-2 mt-1 text-sm text-foreground-muted">{post.frontMatter.summary}</p>
        )}
        <PostMetadata content={post.content} publishedAt={post.frontMatter.publishedAt} />
      </Link>
    </li>
  );
}
