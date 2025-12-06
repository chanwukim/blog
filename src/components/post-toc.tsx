"use client";

import { useEffect, useState } from "react";

import { cn } from "@/libs/cn";
import { type TocItem } from "@/libs/toc";

const HEADINGS_SELECTOR = "article h2:not(.footnotes h2), article h3";

interface PostTocProps {
  items: TocItem[];
}

export function PostToc({ items }: PostTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  // heading 요소에 id 설정
  useEffect(
    function setHeadingIds() {
      const headings = Array.from(document.querySelectorAll(HEADINGS_SELECTOR));

      items.forEach((item, index) => {
        const heading = headings[index];
        if (heading) {
          heading.id = item.id;
        }
      });
    },
    [items]
  );

  useEffect(function handleCurrentHeading() {
    const handleScroll = () => {
      const headings = Array.from(document.querySelectorAll(HEADINGS_SELECTOR));

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];

        if (heading.getBoundingClientRect().top <= 150) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed hidden lg:block">
      <h3 className="sr-only">콘텐츠 목록</h3>
      <ul className="flex flex-col gap-1 pl-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "hover:text-primary",
                item.level === 3 && "pl-2",
                activeId === item.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
