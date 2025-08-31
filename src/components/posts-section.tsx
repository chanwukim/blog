import Link from "next/link";

import { cn } from "@/libs/cn";
import { getReadingTime } from "@/libs/get-reading-time";
import { type Post } from "@/libs/posts";
import { Badge } from "./ui/badge";

interface PostsSectionProps {
  posts: Post[];
}

export function PostsSection({ posts }: PostsSectionProps) {
  if (posts.length === 0) {
    return (
      <div className="text-muted-foreground py-16 text-center">
        <p>아직 작성된 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="sr-only">글 목록</h2>
      {posts.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </section>
  );
}

interface PostsItemProps {
  post: Post;
}

function PostsItem({ post }: PostsItemProps) {
  const { metadata, content, slug } = post;
  const { text: readingTime } = getReadingTime(content);

  return (
    <article className="hover:bg-muted/50 active:bg-muted relative px-3 py-6">
      <h3 className="line-clamp-2 text-lg leading-tight font-semibold">
        {metadata.title}
      </h3>

      {metadata.description && metadata.description.length > 0 && (
        <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm">
          {metadata.description}
        </p>
      )}

      <div>
        <Link href={`/post/${slug}`} className="absolute inset-0 block">
          <span className="sr-only">{metadata.title} 읽기</span>
        </Link>
      </div>

      <div
        className={cn(
          "text-muted-foreground flex items-center gap-2 text-xs",
          metadata.description ? "mt-4" : "mt-2",
        )}
      >
        <time dateTime={metadata.publishedAt}>{metadata.publishedAt}</time>
        <span>·</span>
        <span>{readingTime}</span>
      </div>

      {metadata.tags.length > 0 && (
        <div className="mt-1">
          <span className="sr-only">{metadata.title}의 태그</span>
          <PostTags tags={metadata.tags} />
        </div>
      )}
    </article>
  );
}

function PostTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="flex w-fit flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="relative">
          <Badge variant="secondary" size="sm" asChild>
            <Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
          </Badge>
        </li>
      ))}
    </ul>
  );
}
