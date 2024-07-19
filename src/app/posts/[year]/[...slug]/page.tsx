import { Metadata } from "next";
import { notFound } from "next/navigation";

import { HtmlRenderer, PostComments } from "@/components";
import { PostMetadata } from "@/components/post-metadata";
import { SITE_CONFIG } from "@/constants";
import { getAllPostSlugs, getPostByYearAndSlug, markdownToHtml } from "@/libs";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => {
    const [year, ...slugParts] = slug.split("/");
    return { year, slug: slugParts };
  });
}

export async function generateMetadata({ params }: PostDetailProps): Promise<Metadata> {
  const { year, slug } = params;
  const post = getPostByYearAndSlug(year, slug);

  if (!post) {
    return {};
  }

  const { frontMatter } = post;

  return {
    title: frontMatter.title,
    description: frontMatter.summary || "",
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.summary || "",
      type: "article",
      publishedTime: frontMatter.publishedAt,
      url: `${SITE_CONFIG.url}/posts/${year}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.summary || "",
    },
  };
}

interface PostDetailProps {
  params: { year: string; slug: string };
}

export default async function PostDetail({ params }: PostDetailProps) {
  const { year, slug } = params;

  const post = getPostByYearAndSlug(year, slug);

  if (!post) {
    notFound();
  }

  const { frontMatter } = post;
  const html = await markdownToHtml(post.content);

  return (
    <>
      <article className="mx-auto w-full">
        <div className="border-b border-b-gray-300 pb-10 pt-10">
          <h1 className="text-3xl font-semibold leading-normal">{frontMatter.title}</h1>

          <PostMetadata content={post.content} publishedAt={post.frontMatter.publishedAt} />
        </div>

        <HtmlRenderer html={html} className="mt-10" />
      </article>
      <PostComments className="mt-14" />
    </>
  );
}
