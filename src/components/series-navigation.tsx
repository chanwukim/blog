import Link from "next/link";

import { Button } from "@/components/ui/button";
import { type Post } from "@/libs/posts";
import { ChevronLeftIcon } from "./icons/chevron-left-icon";
import { ChevronRightIcon } from "./icons/chevron-right-icon";

interface SeriesNavigationProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

export function SeriesNavigation({
  prevPost,
  nextPost,
}: SeriesNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          {prevPost && (
            <Link href={`/post/${prevPost.slug}`} className="block">
              <Button variant="outline" className="h-auto w-full p-4 text-left">
                <div className="flex flex-1 items-center gap-2">
                  <ChevronLeftIcon className="size-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-xs">이전 글</div>
                    <div className="truncate font-medium">
                      {prevPost.metadata.title}
                    </div>
                  </div>
                </div>
              </Button>
            </Link>
          )}
        </div>

        <div className="flex-1">
          {nextPost && (
            <Link href={`/post/${nextPost.slug}`} className="block">
              <Button
                variant="outline"
                className="h-auto w-full p-4 text-right"
              >
                <div className="flex flex-1 items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-xs">다음 글</div>
                    <div className="truncate font-medium">
                      {nextPost.metadata.title}
                    </div>
                  </div>
                  <ChevronRightIcon className="size-4 shrink-0" />
                </div>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
