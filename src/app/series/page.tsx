import { type Metadata } from "next";
import Link from "next/link";

import {
  BlogContent,
  BlogContentAside,
  BlogContentMain,
  BlogFooter,
  BlogHeader,
} from "@/components/blog-layout";
import { NavTab } from "@/components/nav-tab";
import { TagsSection } from "@/components/tags-section";
import { SITE_CONFIG } from "@/libs/constants";
import { getAllSeries, getAllTags, getSeriesCounts } from "@/libs/posts";

export const metadata: Metadata = {
  title: "시리즈",
  description: "주제별로 묶인 포스트 시리즈 목록입니다.",
  openGraph: {
    title: "시리즈 | 기록",
    description: "주제별로 묶인 포스트 시리즈 목록입니다.",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.URL}/api/og?title=${encodeURIComponent("시리즈")}&description=${encodeURIComponent("주제별로 묶인 포스트 시리즈 목록입니다.")}&type=series`,
        width: 1200,
        height: 630,
        alt: "시리즈",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "시리즈 | 기록",
    description: "주제별로 묶인 포스트 시리즈 목록입니다.",
    images: [
      `${SITE_CONFIG.URL}/api/og?title=${encodeURIComponent("시리즈")}&description=${encodeURIComponent("주제별로 묶인 포스트 시리즈 목록입니다.")}&type=series`,
    ],
  },
};

export default async function SeriesPage() {
  const series = await getAllSeries();
  const seriesCounts = await getSeriesCounts();
  const tags = await getAllTags();

  return (
    <>
      <BlogHeader />
      <BlogContent>
        <BlogContentMain>
          <NavTab currentTab="series" />

          {series.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">아직 시리즈가 없습니다.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {series.map((seriesItem) => (
                <Link
                  key={seriesItem}
                  href={`/series/${encodeURIComponent(seriesItem)}`}
                  className="hover:bg-muted/50 block p-6 transition-colors not-last:border-b"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{seriesItem}</h3>
                      <p className="text-muted-foreground text-sm">
                        {seriesCounts[seriesItem] || 0}개의 포스트
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </BlogContentMain>
        <BlogContentAside>
          <TagsSection tags={tags} />
        </BlogContentAside>
      </BlogContent>
      <BlogFooter />
    </>
  );
}
