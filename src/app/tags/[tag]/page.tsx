import { getAllCategories, getAllTags, getPostsByTag } from "@/lib/post";

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

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = decodeURIComponent((await params).tag);
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: `태그 ${tag}`,
    description: `태그 ${tag}에 대한 글들입니다.`,
  };
}

interface TagsPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagsPage({ params }: TagsPageProps) {
  const categories = await getAllCategories();
  const tags = await getAllTags();
  const tag = decodeURIComponent((await params).tag);
  const postsByTag = await getPostsByTag(tag);

  return (
    <>
      <AppHeader />
      <AppPageLayout>
        <AppPageLayoutContent>
          <Profile />
          <BlogTavNav />
          <TagsSection tags={tags} className="only-mobile" />
          <Posts posts={postsByTag} />
        </AppPageLayoutContent>
        <AppPageLayoutSidebar>
          <CategoriesNav categories={categories} className="not-mobile" />
          <TagsSection tags={tags} className="not-mobile" />
        </AppPageLayoutSidebar>
      </AppPageLayout>
    </>
  );
}
