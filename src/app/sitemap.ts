import type { MetadataRoute } from "next";

import { getAllPosts, getAllSeries } from "@/lib/posts/v2";

import SITE_CONFIG from "@/constants/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const urls: MetadataRoute.Sitemap = [];

  urls.push(
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/me`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  );

  getAllSeries().forEach((series) => {
    urls.push({
      url: `${baseUrl}/${encodeURIComponent(series)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  getAllPosts().forEach((post) => {
    urls.push({
      url: `${baseUrl}/${encodeURIComponent(post.series)}/${encodeURIComponent(post.slug)}`,
      lastModified: new Date(post.frontMatter.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return urls;
}
