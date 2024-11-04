import styles from "./category-list.module.css";

import Link from "next/link";

import cn from "@/lib/cn";

interface CategoryListProps {
  categories: string[];
  currentCategory?: string;
  className?: string;
}

export default function CategoryList({
  categories,
  currentCategory,
  className,
}: CategoryListProps) {
  return (
    <section className={className}>
      <h2 className={styles.title}>카테고리</h2>
      <ul className={styles.list}>
        <li>
          <Link
            href="/"
            className={cn(
              "link",
              styles.link,
              currentCategory === "전체글" && styles.active,
            )}
          >
            전체글
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <Link
              href={`/category/${encodeURIComponent(category)}`}
              className={cn(
                "link",
                styles.link,
                currentCategory === category && styles.active,
              )}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
