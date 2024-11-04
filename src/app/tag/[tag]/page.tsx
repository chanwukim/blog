import styles from "./page.module.css";

import { SITE_CONFIG } from "@/lib/constants";
import { getAllCategories, getAllTags, getPostsByTag } from "@/lib/post";

import CategoryList from "@/components/category-list";
import * as Layout from "@/components/layout";
import PostList from "@/components/post-list";
import TagBadge from "@/components/tag-badge";
import TagList from "@/components/tag-list";

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: `${tag} | ${SITE_CONFIG.title}`,
    description: `태그 ${tag}에 대한 글들입니다.`,
  };
}

interface TagsPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagsPage({ params }: TagsPageProps) {
  const tags = await getAllTags();
  const categories = await getAllCategories();
  const tag = decodeURIComponent((await params).tag);
  const postsByTag = await getPostsByTag(tag);

  return (
    <>
      <Layout.Root>
        <Layout.Side>
          <CategoryList categories={categories} currentCategory="All" />
          <TagList tags={tags} />
        </Layout.Side>
        <Layout.Main>
          <div className={styles.currentTag}>
            태그: <TagBadge tag={tag} />
          </div>
          <PostList posts={postsByTag} />
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
