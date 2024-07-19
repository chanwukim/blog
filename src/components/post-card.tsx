import Link from "next/link";

import { Post } from "@/types";

import { PostMetadata } from "./post-metadata";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article>
      <h1 className="line-clamp-2 overflow-hidden text-ellipsis font-medium hover:underline">
        <Link href={`/posts/${post.slug}`}>{post.frontMatter.title}</Link>
      </h1>
      {post.frontMatter.summary && (
        <p className="text-mute mt-1 text-sm">{post.frontMatter.summary}</p>
      )}
      <PostMetadata content={post.content} publishedAt={post.frontMatter.publishedAt} />
    </article>
  );
}
