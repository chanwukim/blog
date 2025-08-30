"use client";

import { useEffect, useState } from "react";

import { cn } from "@/libs/cn";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const HEADINGS_SELECTOR = "article h2:not(.footnotes h2), article h3";

export function PostToc() {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(function initializeTocItems() {
    const headings = Array.from(document.querySelectorAll(HEADINGS_SELECTOR));

    const items = headings.map((heading) => {
      const text = heading.textContent || "";
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, "") // 영문, 숫자, 한글, 공백, -만 허용
        .replace(/\s+/g, "-") // 연속된 공백을 -으로
        .replace(/^-+|-+$/g, ""); // 시작, 끝의 - 제거

      heading.id = id;

      return {
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setTocItems(items);
  }, []);

  useEffect(function handleCurrentHeading() {
    const handleScroll = () => {
      const headings = Array.from(document.querySelectorAll(HEADINGS_SELECTOR));

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];

        //  화면 상단으로부터 150px 떨어진 헤딩이 활성화
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
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "hover:text-primary",
                item.level === 3 && "pl-2",
                activeId === item.id
                  ? "text-primary ont-medium"
                  : "text-muted-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
