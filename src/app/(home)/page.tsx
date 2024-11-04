import { getAllCategories, getAllPosts, getAllTags } from "@/lib/post";

import CategoryList from "@/components/category-list";
import * as Layout from "@/components/layout";
import PostList from "@/components/post-list";
import TagList from "@/components/tag-list";

export default async function HomePage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const categories = await getAllCategories();

  return (
    <>
      <Layout.Root>
        <Layout.Side>
          <CategoryList categories={categories} currentCategory="전체글" />
          <TagList tags={tags} />
        </Layout.Side>
        <Layout.Main>
          <PostList posts={posts} />
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
