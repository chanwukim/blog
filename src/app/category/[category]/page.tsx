import { SITE_CONFIG } from "@/lib/constants";
import { getAllCategories, getAllTags, getPostsByCategory } from "@/lib/post";

import CategoryList from "@/components/category-list";
import * as Layout from "@/components/layout";
import PostList from "@/components/post-list";
import TagList from "@/components/tag-list";

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);
  const posts = await getPostsByCategory(category);

  if (posts.length === 0) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: `${category} | ${SITE_CONFIG.title}`,
    description: `카테고리 ${category}에 대한 글들입니다.`,
  };
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const tags = await getAllTags();
  const categories = await getAllCategories();
  const category = decodeURIComponent((await params).category);
  const postsByCategory = await getPostsByCategory(category);

  return (
    <Layout.Root>
      <Layout.Side>
        <CategoryList categories={categories} currentCategory={category} />
        <TagList tags={tags} />
      </Layout.Side>
      <Layout.Main>
        <PostList posts={postsByCategory} />
      </Layout.Main>
    </Layout.Root>
  );
}
