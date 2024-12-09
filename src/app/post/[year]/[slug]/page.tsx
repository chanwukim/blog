import { notFound } from "next/navigation";

import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/post";

import Article from "@/components/blog/article";
import ArticleToc from "@/components/blog/article-toc";
import {
  AppHeader,
  AppPageLayout,
  AppPageLayoutContent,
  AppPageLayoutSidebar,
} from "@/components/layout/app-layout";

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
  const post = await getPostBySlug(`${year}/${slug}`);

  if (!post) {
    notFound();
  }

  return (
    <>
      <AppHeader />
      <AppPageLayout>
        <AppPageLayoutContent>
          <Article post={post} />
        </AppPageLayoutContent>
        <AppPageLayoutSidebar>
          <ArticleToc />
        </AppPageLayoutSidebar>
      </AppPageLayout>
    </>
  );
}
