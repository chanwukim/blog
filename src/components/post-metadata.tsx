import { getReadingTimeInMinutes } from "@/libs";

interface PostMetadataProps {
  content: string;
  publishedAt: string;
}

export function PostMetadata({ content, publishedAt }: PostMetadataProps) {
  const { text: readMin } = getReadingTimeInMinutes(content);

  return (
    <dl className="mt-1 flex items-center text-xs text-foreground-muted">
      <dt className="sr-only">Published at</dt>
      <dd>
        <time dateTime={publishedAt}>{publishedAt}</time>
      </dd>
      <div className="mx-2">·</div>
      <dt className="sr-only">Reading time</dt>
      <dd>{readMin}</dd>
    </dl>
  );
}
