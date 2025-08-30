import { SITE_CONFIG } from "@/libs/constants";
import { getAllPosts, getAllSeries, getAllTags } from "@/libs/posts";

export default async function sitemap() {
  const posts = await getAllPosts();
  const series = await getAllSeries();
  const tags = await getAllTags();

  const routes = ["", "/posts"].map((route) => ({
    url: `${SITE_CONFIG.URL}${route}`,
    lastModified: new Date(),
  }));

  const postUrls = posts.map((post) => ({
    url: `${SITE_CONFIG.URL}/posts/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
  }));

  const seriesUrls = series.map((seriesItem) => ({
    url: `${SITE_CONFIG.URL}/series/${encodeURIComponent(seriesItem)}`,
    lastModified: new Date(),
  }));

  const tagUrls = tags.map((tag) => ({
    url: `${SITE_CONFIG.URL}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  return [...routes, ...postUrls, ...seriesUrls, ...tagUrls];
}
