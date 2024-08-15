import { notFound } from "next/navigation";

import { Pagination, Posts, Tags } from "@/components";
import { SITE_CONFIG } from "@/constants";
import { getAllTags, getPaginatedPosts, getPostCount } from "@/libs";

interface PostPaginationProps {
  params: { page: string[] };
}

export default function PostPaginationPage({ params }: PostPaginationProps) {
  const currentPage = parseInt(params.page[0] || "1", 10);
  const posts = getPaginatedPosts(currentPage, SITE_CONFIG.limitPerPage);
  const allTags = getAllTags();
  const totalPosts = getPostCount();
  const totalPages = Math.ceil(totalPosts / SITE_CONFIG.limitPerPage);

  if (posts.length < 1) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <Posts list={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="" />
      <Tags tags={allTags} />
    </div>
  );
}
