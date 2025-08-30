import { notFound } from "next/navigation";

import {
  BlogContent,
  BlogContentAside,
  BlogContentMain,
  BlogFooter,
  BlogHeader,
} from "@/components/blog-layout";
import { PostToc } from "@/components/post-toc";
import { SeriesAccordion } from "@/components/series-accordion";
import { SeriesNavigation } from "@/components/series-navigation";
import { SITE_CONFIG } from "@/libs/constants";
import { markdownToHtml } from "@/libs/markdown-to-html";
import {
  getAllPosts,
  getPost,
  getPostsBySeries,
  type Post,
} from "@/libs/posts";

interface PostPageProps {
  params: Promise<{
    year: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { year, slug } = await params;
  const post = await getPost(year, slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const ogImageUrl = `${SITE_CONFIG.URL}/api/og?title=${encodeURIComponent(post.metadata.title)}&description=${encodeURIComponent(post.metadata.description)}&type=post`;

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      modifiedTime: post.metadata.updatedAt,
      tags: post.metadata.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [ogImageUrl],
    },
  };
}
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => {
    const [year, slug] = post.slug.split("/");
    return {
      year,
      slug,
    };
  });
}

async function getSeriesNavigation(currentPost: Post): Promise<{
  series: string;
  allPosts: Post[];
  currentIndex: number;
  prevPost: Post | null;
  nextPost: Post | null;
} | null> {
  if (
    !currentPost.metadata.series ||
    currentPost.metadata.series.trim() === ""
  ) {
    return null;
  }

  const seriesPosts = await getPostsBySeries(currentPost.metadata.series);

  // 시리즈 포스트들을 오래된 순으로 정렬
  const sortedPosts = seriesPosts.sort(
    (a, b) =>
      new Date(a.metadata.publishedAt).getTime() -
      new Date(b.metadata.publishedAt).getTime(),
  );

  const currentIndex = sortedPosts.findIndex(
    (post) => post.slug === currentPost.slug,
  );

  if (currentIndex === -1) {
    return null;
  }

  return {
    series: currentPost.metadata.series,
    allPosts: sortedPosts,
    currentIndex,
    prevPost: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    nextPost:
      currentIndex < sortedPosts.length - 1
        ? sortedPosts[currentIndex + 1]
        : null,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, slug } = await params;
  const post = await getPost(year, slug);

  if (!post || !post.metadata.isPublished) {
    notFound();
  }

  const html = await markdownToHtml(post.content);
  const seriesNavigation = await getSeriesNavigation(post);

  return (
    <>
      <BlogHeader />
      <BlogContent>
        <BlogContentMain>
          {seriesNavigation && (
            <SeriesAccordion
              series={seriesNavigation.series}
              allPosts={seriesNavigation.allPosts}
              currentIndex={seriesNavigation.currentIndex}
            />
          )}
          <article
            className="article break-keep md:px-0"
            dangerouslySetInnerHTML={{ __html: html }}
          ></article>
          {seriesNavigation && (
            <SeriesNavigation
              prevPost={seriesNavigation.prevPost}
              nextPost={seriesNavigation.nextPost}
            />
          )}
        </BlogContentMain>
        <BlogContentAside>
          <PostToc />
        </BlogContentAside>
      </BlogContent>
      <BlogFooter />
    </>
  );
}
