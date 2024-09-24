import { getAllPosts } from "@/lib/posts/v2";

import Posts from "@/components/post/posts";
import MobileSeries from "@/components/series/mobile-series";
import { PageLayoutContent } from "@/components/ui/layout";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <PageLayoutContent>
      <MobileSeries />
      <Posts posts={posts} />
    </PageLayoutContent>
  );
}
