import Link from "next/link";

import { XIcon } from "./icons/x-icon";
import { Badge } from "./ui/badge";

interface TagsSectionProps {
  tags: string[];
  currentTag?: string;
}

export function TagsSection({ tags, currentTag }: TagsSectionProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="text-muted-foreground mb-2 text-xs font-medium select-none">
        Tags
      </h3>
      <ul className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge
              variant={currentTag === tag ? "default" : "secondary"}
              size="sm"
              asChild
            >
              <Link
                href={
                  currentTag === tag ? `/` : `/tags/${encodeURIComponent(tag)}`
                }
                className="truncate text-sm"
              >
                {tag} {currentTag === tag ? <XIcon /> : ""}
              </Link>
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
