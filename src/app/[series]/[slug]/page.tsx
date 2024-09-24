import type { Metadata } from "next";
import { notFound } from "next/navigation";

import cn from "@/lib/cn";
import { getAllPosts, getPostBySeriesAndSlug } from "@/lib/posts/v2";

import PostDetail from "@/components/post/post-detail";
import Toc from "@/components/post/toc";
import MobileSeries from "@/components/series/mobile-series";
import { PageLayoutContent, PageLayoutSidebar, SIDEBAR_TOP } from "@/components/ui/layout";

import SITE_CONFIG from "@/constants/site-config";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    series: post.series,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { series: string; slug: string };
}): Promise<Metadata> {
  const series = decodeURIComponent(params.series);
  const slug = decodeURIComponent(params.slug);
  const post = getPostBySeriesAndSlug(series, slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  const { frontMatter } = post;
  const ogImage = `${SITE_CONFIG.url}/og?title=${frontMatter.title}`;

  return {
    title: frontMatter.title,
    description: frontMatter.summary ?? "",
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.summary ?? "",
      type: "article",
      publishedTime: frontMatter.publishedAt,
      url: `${SITE_CONFIG.url}/${series}/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.summary ?? "",
      images: [ogImage],
    },
  };
}

export default function PostDetailPage({ params }: { params: { series: string; slug: string } }) {
  const series = decodeURIComponent(params.series);
  const slug = decodeURIComponent(params.slug);
  const post = getPostBySeriesAndSlug(series, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageLayoutContent>
        <MobileSeries />
        <PostDetail post={post} />
      </PageLayoutContent>
      <PageLayoutSidebar>
        <Toc className={cn("sticky", SIDEBAR_TOP)} />
      </PageLayoutSidebar>
    </>
  );
}
