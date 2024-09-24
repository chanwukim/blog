"use client";

import React, { useState, useEffect } from "react";

import cn from "@/lib/cn";

interface TocProps {
  className?: string;
}

export default function Toc({ className }: TocProps) {
  const [tocItems, setTocItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3"));

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

  useEffect(() => {
    const handleScroll = () => {
      const headings = Array.from(document.querySelectorAll("h2, h3"));

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];

        //  화면 상단으로부터 100px 떨어진 헤딩이 활성화
        if (heading.getBoundingClientRect().top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={className}>
      <h1 className="sr-only">콘텐츠</h1>
      <ul className="space-y-0.5 border-l pl-2">
        {tocItems.map((item) => (
          <li
            key={item.id}
            className={cn(
              "ml-0 scale-95 transition-transform",
              item.level === 3 && "ml-4",
              activeId === item.id && "scale-100 font-medium",
            )}
          >
            <a href={`#${item.id}`} className="text-sm hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
