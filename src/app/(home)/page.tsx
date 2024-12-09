import { getAllCategories, getAllPosts, getAllTags } from "@/lib/post";

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

export default async function HomePage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return (
    <>
      <AppHeader />
      <AppPageLayout>
        <AppPageLayoutContent>
          <Profile />
          <BlogTavNav />
          <TagsSection tags={tags} className="only-mobile" />
          <Posts posts={posts} />
        </AppPageLayoutContent>
        <AppPageLayoutSidebar>
          <CategoriesNav categories={categories} className="not-mobile" />
          <TagsSection tags={tags} className="not-mobile" />
        </AppPageLayoutSidebar>
      </AppPageLayout>
    </>
  );
}
