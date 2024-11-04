import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts } from "@/lib/post";

export default async function sitemap() {
  const posts = await getAllPosts();

  const blogs = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/post/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/post"].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
