import Link from "next/link";

import { Post } from "@/types";

import { PostMetadata } from "./post-metadata";

interface PostsItemProps {
  post: Post;
}

function PostsItem({ post }: PostsItemProps) {
  return (
    <article>
      <Link
        href={`/posts/${post.slug}`}
        className="block px-1 py-3 transition-[background-color] hover:bg-background-muted active:bg-foreground/10"
      >
        <h1 className="line-clamp-2 overflow-hidden text-ellipsis font-medium">
          {post.frontMatter.title}
        </h1>
        {post.frontMatter.summary && (
          <p className="my-2 text-sm text-foreground-muted">{post.frontMatter.summary}</p>
        )}
        <PostMetadata content={post.content} publishedAt={post.frontMatter.publishedAt} />
      </Link>
    </article>
  );
}

interface PostsProps {
  list: Post[];
}

export function Posts({ list }: PostsProps) {
  return (
    <div className="space-y-2">
      {list.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </div>
  );
}
