import { type Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BlogContent,
  BlogContentAside,
  BlogContentMain,
  BlogFooter,
  BlogHeader,
} from "@/components/blog-layout";
import { NavTab } from "@/components/nav-tab";
import { PostsSection } from "@/components/posts-section";
import { TagsSection } from "@/components/tags-section";
import { SITE_CONFIG } from "@/libs/constants";
import { getAllSeries, getAllTags, getPostsBySeries } from "@/libs/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string }>;
}): Promise<Metadata> {
  const { series: seriesParam } = await params;
  const currentSeries = decodeURIComponent(seriesParam);
  const posts = await getPostsBySeries(currentSeries);

  if (posts.length === 0) {
    return {
      title: "시리즈를 찾을 수 없습니다",
    };
  }

  const description = `${currentSeries} 시리즈의 포스트들 (${posts.length}개)`;
  const ogImageUrl = `${SITE_CONFIG.URL}/api/og?title=${encodeURIComponent(
    currentSeries,
  )}&description=${encodeURIComponent(description)}&type=series`;

  return {
    title: currentSeries,
    description,
    openGraph: {
      title: `${currentSeries} | 기록`,
      description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: currentSeries,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${currentSeries} | 기록`,
      description,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  const series = await getAllSeries();

  return series.map((seriesItem) => ({
    series: encodeURIComponent(seriesItem),
  }));
}

export default async function PostsBySeriesPage({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const { series: seriesParam } = await params;

  if (!seriesParam) {
    return notFound();
  }

  const currentSeries = decodeURIComponent(seriesParam);
  const posts = await getPostsBySeries(currentSeries);
  const tags = await getAllTags();

  return (
    <>
      <BlogHeader />
      <BlogContent>
        <BlogContentMain>
          <NavTab currentTab="series" />
          <section>
            <h2 className="text-primary my-4 text-2xl font-bold">
              {currentSeries}
            </h2>
            <PostsSection posts={posts} />
          </section>
        </BlogContentMain>
        <BlogContentAside>
          <TagsSection tags={tags} />
        </BlogContentAside>
      </BlogContent>
      <BlogFooter />
    </>
  );
}
