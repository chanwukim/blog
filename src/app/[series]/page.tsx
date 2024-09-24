import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllSeries, getPostsBySeries } from "@/lib/posts/v2";

import Posts from "@/components/post/posts";
import MobileSeries from "@/components/series/mobile-series";
import { PageLayoutContent } from "@/components/ui/layout";

export async function generateStaticParams() {
  const series = getAllSeries();
  return series.map((s) => ({ series: s }));
}

export async function generateMetadata({
  params,
}: {
  params: { series: string };
}): Promise<Metadata> {
  const series = decodeURIComponent(params.series);
  const posts = getPostsBySeries(series);

  if (posts.length === 0) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: `${series} 시리즈`,
    description: `시리즈 ${series}의 글`,
  };
}

export default function SeriesPage({ params }: { params: { series: string } }) {
  const series = decodeURIComponent(params.series);

  const posts = getPostsBySeries(series);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <PageLayoutContent>
      <MobileSeries />
      <Posts posts={posts} />
    </PageLayoutContent>
  );
}
