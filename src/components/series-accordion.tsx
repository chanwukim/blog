"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/libs/cn";
import { type Post } from "@/libs/posts";
import { ChevronDownIcon } from "./icons/chevron-down-icon";

interface SeriesAccordionProps {
  series: string;
  allPosts: Post[];
  currentIndex: number;
}

export function SeriesAccordion({
  series,
  allPosts,
  currentIndex,
}: SeriesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 rounded-lg border bg-gray-50 p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">{series}</div>
          <span className="text-muted-foreground text-sm">
            ({currentIndex + 1}/{allPosts.length})
          </span>
        </div>
        <ChevronDownIcon
          size={20}
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-4 space-y-2">
            {allPosts.map((post, index) => {
              const [year, slug] = post.slug.split("/");
              const isCurrent = index === currentIndex;

              return (
                <div key={post.slug} className="flex items-center gap-2">
                  <span className="text-muted-foreground w-6 text-sm">
                    {index + 1}.
                  </span>
                  {isCurrent ? (
                    <span className="text-primary font-medium underline">
                      {post.metadata.title}
                    </span>
                  ) : (
                    <Link href={`/post/${year}/${slug}`}>
                      {post.metadata.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
