import styles from "./app-layout.module.css";

import { getAllCategories } from "@/lib/post";
import type { PropsWithChildren } from "@/lib/types";

import Footer from "./footer";
import Header from "./header";

export async function AppHeader() {
  const categories = await getAllCategories();
  return <Header categories={categories} />;
}

export function AppPageLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
}

export function AppPageLayoutContent({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}

export function AppPageLayoutSidebar({ children }: PropsWithChildren) {
  return (
    <aside className={styles.sidebar}>
      <h2 className="sr-only">사이드바</h2>
      {children}
    </aside>
  );
}
