import { Pagination, Posts, Tags } from "@/components";
import { SITE_CONFIG } from "@/constants";
import { getAllTags, getPaginatedPosts, getPostCount } from "@/libs";

const PAGE = 1;

export default function HomePage() {
  const posts = getPaginatedPosts(PAGE, SITE_CONFIG.limitPerPage);
  const allTags = getAllTags();
  const totalPosts = getPostCount();
  const totalPages = Math.ceil(totalPosts / SITE_CONFIG.limitPerPage);

  return (
    <div className="flex flex-col">
      <Posts list={posts} />
      <Pagination currentPage={PAGE} totalPages={totalPages} basePath="" />
      <Tags tags={allTags} />
    </div>
  );
}
