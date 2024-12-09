import { getAllCategories, getAllTags } from "@/lib/post";

import About from "@/components/blog/about";
import BlogTavNav from "@/components/blog/blog-tab-nav";
import CategoriesNav from "@/components/blog/categories-nav";
import Profile from "@/components/blog/profile";
import TagsSection from "@/components/blog/tags-section";
import {
  AppHeader,
  AppPageLayout,
  AppPageLayoutContent,
  AppPageLayoutSidebar,
} from "@/components/layout/app-layout";

export default async function AboutPage() {
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return (
    <>
      <AppHeader />
      <AppPageLayout>
        <AppPageLayoutContent>
          <Profile />
          <BlogTavNav />
          <About />
        </AppPageLayoutContent>
        <AppPageLayoutSidebar>
          <CategoriesNav categories={categories} className="not-mobile" />
          <TagsSection tags={tags} className="not-mobile" />
        </AppPageLayoutSidebar>
      </AppPageLayout>
    </>
  );
}
