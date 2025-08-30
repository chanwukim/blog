import { type Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BlogContent,
  BlogContentAside,
  BlogContentMain,
  BlogFooter,
  BlogHeader,
} from "@/components/blog-layout";
import { MobileTagsBar } from "@/components/mobile-tags-bar";
import { NavTab } from "@/components/nav-tab";
import { PostsSection } from "@/components/posts-section";
import { TagsSection } from "@/components/tags-section";
import { SITE_CONFIG } from "@/libs/constants";
import { getAllTags, getPostsByTag } from "@/libs/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagParam } = await params;
  const currentTag = decodeURIComponent(tagParam);
  const posts = await getPostsByTag(currentTag);

  const description = `${currentTag} 태그가 포함된 포스트들 (${posts.length}개)`;
  const ogImageUrl = `${SITE_CONFIG.URL}/api/og?title=${encodeURIComponent(`#${currentTag}`)}&description=${encodeURIComponent(description)}&type=tag`;

  return {
    title: `#${currentTag}`,
    description,
    openGraph: {
      title: `#${currentTag} | 기록`,
      description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `#${currentTag}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `#${currentTag} | 기록`,
      description,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function PostsByTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: tagParam } = await params;

  if (!tagParam) {
    return notFound();
  }

  const currentTag = decodeURIComponent(tagParam);
  const posts = await getPostsByTag(currentTag);
  const tags = await getAllTags();

  const sortedTags = [currentTag, ...tags.filter((tag) => tag !== currentTag)];

  return (
    <>
      <BlogHeader />
      <BlogContent>
        <BlogContentMain>
          <NavTab currentTab="all" />
          <MobileTagsBar tags={sortedTags} currentTag={currentTag} />
          <PostsSection posts={posts} />
        </BlogContentMain>
        <BlogContentAside>
          <TagsSection tags={tags} currentTag={currentTag} />
        </BlogContentAside>
      </BlogContent>
      <BlogFooter />
    </>
  );
}
