import {
  BlogContent,
  BlogContentAside,
  BlogContentMain,
  BlogFooter,
  BlogHeader,
} from "@/components/blog-layout";
import { MobileTagsBar } from "@/components/mobile-tags-bar";
import { NavTab } from "@/components/nav-tab";
import { PostsSection } from "@/components/posts-section";
import { TagsSection } from "@/components/tags-section";
import { getAllPosts, getAllTags } from "@/libs/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <>
      <BlogHeader />
      <BlogContent>
        <BlogContentMain>
          <NavTab currentTab="all" />
          <MobileTagsBar tags={tags} />
          <PostsSection posts={posts} />
        </BlogContentMain>
        <BlogContentAside>
          <TagsSection tags={tags} />
        </BlogContentAside>
      </BlogContent>
      <BlogFooter />
    </>
  );
}
