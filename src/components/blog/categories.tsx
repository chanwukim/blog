import styles from "./categories.module.css";

import Link from "next/link";

import { Title } from "@/components/ui/title";

interface CategoriesProps {
  categories: string[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <section>
      <h2 className="sr-only">카테고리</h2>
      <ul className={styles.categories}>
        {categories.map((category) => (
          <li key={category} className={styles.categoryWrapper}>
            <Title
              as={Link}
              href={`/categories/${encodeURIComponent(category)}`}
              size="subtitle-2"
              className={styles.category}
            >
              {category}
            </Title>
          </li>
        ))}
      </ul>
    </section>
  );
}
