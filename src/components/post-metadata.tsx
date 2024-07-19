import { getReadingTimeInMinutes } from "@/libs";

interface PostMetadataProps {
  content: string;
  publishedAt: string;
}

export function PostMetadata({ content, publishedAt }: PostMetadataProps) {
  const { text: readMin } = getReadingTimeInMinutes(content);

  return (
    <dl className="text-mute mt-2 flex items-center text-xs">
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
