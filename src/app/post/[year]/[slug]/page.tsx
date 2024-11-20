import { notFound } from "next/navigation";

import { SITE_CONFIG } from "@/lib/constants";
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getPostBySlug,
} from "@/lib/post";

import CategoryList from "@/components/category-list";
import * as Layout from "@/components/layout";
import PostDetail from "@/components/post-detail";
import TagList from "@/components/tag-list";
import Toc from "@/components/toc";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    year: post.slug.split("/")[0],
    slug: post.slug.split("/")[1],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  const post = await getPostBySlug(`${year}/${slug}`);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  const { title, description, publishedAt } = post;

  return {
    title,
    description: description ?? SITE_CONFIG.description,
    openGraph: {
      title,
      description: description ?? SITE_CONFIG.description,
      type: "article",
      publishedTime: publishedAt,
      url: `${SITE_CONFIG.url}/post/${year}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

interface PostPageProps {
  params: Promise<{
    year: string;
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, slug } = await params;
  const tags = await getAllTags();
  const categories = await getAllCategories();
  const post = await getPostBySlug(`${year}/${slug}`);

  if (!post) {
    notFound();
  }

  return (
    <Layout.Root>
      <Layout.Side>
        <CategoryList categories={categories} currentCategory="All" />
        <TagList tags={tags} />
      </Layout.Side>
      <Layout.Main>
        <PostDetail post={post} />
      </Layout.Main>
      <Layout.Side>
        <Toc />
      </Layout.Side>
    </Layout.Root>
  );
}
