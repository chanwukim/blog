import styles from "./page.module.css";

import { getAllCategories, getAllTags, getPostsByCategory } from "@/lib/post";

import BlogTavNav from "@/components/blog/blog-tab-nav";
import CategoriesNav from "@/components/blog/categories-nav";
import Posts from "@/components/blog/posts";
import Profile from "@/components/blog/profile";
import TagsSection from "@/components/blog/tags-section";
import {
  AppHeader,
  AppPageLayout,
  AppPageLayoutContent,
  AppPageLayoutSidebar,
} from "@/components/layout/app-layout";
import { Title } from "@/components/ui/title";

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = decodeURIComponent((await params).category);
  const posts = await getPostsByCategory(category);

  if (posts.length === 0) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: `카테고리 ${category}`,
    description: `카테고리 ${category}에 대한 글들입니다.`,
  };
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getAllCategories();
  const tags = await getAllTags();
  const category = decodeURIComponent((await params).category);
  const postsByCategory = await getPostsByCategory(category);

  return (
    <>
      <AppHeader />
      <AppPageLayout>
        <AppPageLayoutContent>
          <Profile />
          <BlogTavNav />
          <TagsSection tags={tags} className="only-mobile" />
          <div className={styles.titleWrapper}>
            <Title as="div" size="subtitle-2" weight="regular">
              <span className="color-muted">CATEGORIES / </span>
              <Title as="span" size="subtitle-2" weight="semibold">
                {" "}
                {category}
              </Title>
            </Title>
          </div>
          <Posts posts={postsByCategory} />
        </AppPageLayoutContent>
        <AppPageLayoutSidebar>
          <CategoriesNav categories={categories} className="not-mobile" />
          <TagsSection tags={tags} className="not-mobile" />
        </AppPageLayoutSidebar>
      </AppPageLayout>
    </>
  );
}
