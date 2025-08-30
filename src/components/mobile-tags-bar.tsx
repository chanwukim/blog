import Link from "next/link";

import { XIcon } from "./icons/x-icon";
import { Badge } from "./ui/badge";

interface MobileTagsBarProps {
  tags: string[];
  currentTag?: string;
}

export function MobileTagsBar({ tags, currentTag }: MobileTagsBarProps) {
  return (
    <div className="mb-4">
      <div className="overflow-hidden lg:hidden">
        <ul className="relative flex w-full items-center gap-2 overflow-x-auto p-4">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge
                variant={currentTag === tag ? "default" : "secondary"}
                size="sm"
                asChild
              >
                <Link
                  href={
                    currentTag === tag
                      ? `/`
                      : `/tags/${encodeURIComponent(tag)}`
                  }
                  className="truncate text-sm"
                >
                  {tag} {currentTag === tag ? <XIcon /> : ""}
                </Link>
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
