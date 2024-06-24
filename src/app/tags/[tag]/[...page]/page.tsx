import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard, Pagination, Tags } from "@/components";
import { SITE_CONFIG } from "@/constants";
import { getAllPosts, getAllTags } from "@/libs";

export async function generateStaticParams() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  const params: { tag: string; page: string[] }[] = [];

  allTags.forEach((tag) => {
    const postsByTag = allPosts.filter((post) =>
      post.frontMatter.tags.includes(tag),
    );

    const totalPages = Math.ceil(postsByTag.length / SITE_CONFIG.limitPerPage);

    for (let page = 1; page <= totalPages; page++) {
      params.push({ tag: encodeURIComponent(tag), page: [`${page}`] });
    }
  });

  return params;
}

export async function generateMetadata({
  params,
}: TagsPaginationProps): Promise<Metadata> {
  const { tag } = params;

  return {
    title: `태그 ${tag} 붙은 글`,
    description: `${tag} 태그가 붙은 모든 게시물 찾아보기`,
  };
}

type TagsPaginationProps = { params: { tag: string; page: string } };

export default function TagsPagination({ params }: TagsPaginationProps) {
  const { tag: encodedTag } = params;
  const tag = decodeURIComponent(encodedTag);

  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const postsFoundByTag = allPosts.filter((post) =>
    post.frontMatter.tags.find((t) => t === tag),
  );

  if (postsFoundByTag.length < 1) {
    notFound();
  }

  const currentPage = parseInt(params.page[0] || "1", 10);
  const totalPages = Math.ceil(
    postsFoundByTag.length / SITE_CONFIG.limitPerPage,
  );

  const startIndex = (currentPage - 1) * SITE_CONFIG.limitPerPage;
  const endIndex = startIndex + SITE_CONFIG.limitPerPage;
  const currentPosts = postsFoundByTag.slice(startIndex, endIndex);

  if (currentPosts.length < 1) {
    notFound();
  }

  const basePath = `/tags/${encodedTag}`;

  return (
    <div className="flex flex-col">
      <div className="space-y-10">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
      <Tags activeTag={tag} tags={allTags} />
    </div>
  );
}
