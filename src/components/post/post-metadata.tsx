import getReadingTime from "@/lib/get-reading-time";

interface PostMetadataProps {
  content: string;
  publishedAt: string;
}

export default function PostMetadata({ content, publishedAt }: PostMetadataProps) {
  const { text: readMin } = getReadingTime(content);

  return (
    <dl className="mt-1 flex items-center text-xs text-foreground-muted">
      <dt className="sr-only">작성일</dt>
      <dd>
        <time dateTime={publishedAt}>{publishedAt}</time>
      </dd>
      <dt className="sr-only">구분자</dt>
      <dd className="mx-2">·</dd>
      <dt className="sr-only">읽는 시간</dt>
      <dd>{readMin}</dd>
    </dl>
  );
}
