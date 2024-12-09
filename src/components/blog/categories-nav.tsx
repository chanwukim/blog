"use client";

import styles from "./categories-nav.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import cn from "@/lib/cn";

import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface CategoriesNavProps {
  categories: string[];
  className?: string;
}

export default function CategoriesNav({
  categories,
  className,
}: CategoriesNavProps) {
  const pathname = usePathname();
  const categoryFromPathname = pathname.split("/categories/").pop();
  const activeCategory = categoryFromPathname
    ? decodeURIComponent(categoryFromPathname)
    : null;

  return (
    <nav className={cn(styles.nav, className)}>
      <Text as="h3" size="caption" weight="medium" className="color-muted">
        CATEGORIES
      </Text>
      <ul className={styles.categories}>
        <li>
          <Button
            as={Link}
            href="/"
            size="sm"
            variant={activeCategory === "/" ? "default" : "ghost"}
            className={styles.category}
          >
            전체
          </Button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <Button
              as={Link}
              href={`/categories/${encodeURIComponent(category)}`}
              size="sm"
              variant={activeCategory === category ? "default" : "ghost"}
              className={styles.category}
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
