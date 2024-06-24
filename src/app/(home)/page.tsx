import { Pagination, PostCard, Tags } from "@/components";
import { SITE_CONFIG } from "@/constants";
import { getAllTags, getPaginatedPosts, getPostCount } from "@/libs";

const PAGE = 1;

export default function Home() {
  const posts = getPaginatedPosts(PAGE, SITE_CONFIG.limitPerPage);
  const allTags = getAllTags();
  const totalPosts = getPostCount();
  const totalPages = Math.ceil(totalPosts / SITE_CONFIG.limitPerPage);

  return (
    <div className="flex flex-col">
      <div className="space-y-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={PAGE} totalPages={totalPages} basePath="" />
      <Tags tags={allTags} />
    </div>
  );
}
