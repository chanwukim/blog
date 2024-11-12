"use client";

import styles from "./toc.module.css";

import React, { useState, useEffect } from "react";

import cn from "@/lib/cn";

import VisuallyHidden from "./visually-hidden";

export default function Toc() {
  const [tocItems, setTocItems] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(function initializeTocItems() {
    const headings = Array.from(
      document.querySelectorAll("article h3, article h4"),
    );

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
      const headings = Array.from(
        document.querySelectorAll("article h3, article h4"),
      );

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
    <nav>
      <VisuallyHidden as="h3">콘텐츠 </VisuallyHidden>
      <ul className={styles.list}>
        {tocItems.map((item) => (
          <li
            key={item.id}
            className={cn(
              item.level === 4 && styles.h4,
              activeId === item.id && styles.active,
            )}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
