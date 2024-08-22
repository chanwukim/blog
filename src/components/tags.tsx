"use client";

import { useState } from "react";

import { Tag } from "./tag";

const MAX_TAG_SIZE = 10;

interface TagsProps {
  tags: string[];
  activeTag?: string;
}

export function Tags({ tags, activeTag }: TagsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayedTags = isOpen ? tags : tags.slice(0, MAX_TAG_SIZE);

  return (
    <section className="order-first mb-3 mt-8">
      <h1 className="sr-only">TAGS</h1>

      <ul className="flex flex-wrap gap-1">
        <li>
          <Tag name="전체" href="/" variant={activeTag ? "ghost" : "filled"} />
        </li>
        {displayedTags.map((tag) => (
          <li key={tag}>
            <Tag name={tag} variant={tag === activeTag ? "filled" : "ghost"} />
          </li>
        ))}
      </ul>

      {tags.length > MAX_TAG_SIZE && (
        <div className="flex justify-center">
          <button onClick={() => setIsOpen(!isOpen)} className="mt-2">
            <span className="text-sm">{isOpen ? "접기" : "펼치기"}</span>
          </button>
        </div>
      )}
    </section>
  );
}
