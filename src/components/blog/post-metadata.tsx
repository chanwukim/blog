import styles from "./post-metadata.module.css";

import cn from "@/lib/cn";

import { Text } from "../ui/text";

interface PostMetadataProps {
  publishedAt: string;
  readingTime: string;
  className?: string;
}

export default function PostMetadata({
  publishedAt,
  readingTime,
  className,
}: PostMetadataProps) {
  return (
    <div className={cn(styles.meta, className)}>
      <Text as="time" dateTime={publishedAt}>
        {publishedAt}
      </Text>
      <Text>·</Text>
      <Text>{readingTime}</Text>
    </div>
  );
}
