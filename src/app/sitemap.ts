import { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/constants";
import { getAllPosts, getAllPostSlugs, getAllTags } from "@/libs";

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
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  );

  // 모든 글 경로 추가
  const postSlugs = getAllPostSlugs();
  postSlugs.forEach((slug) => {
    const [year, ...slugParts] = slug.split("/");
    const postUrl = `${baseUrl}/posts/${year}/${slugParts.join("/")}`;
    urls.push({
      url: postUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // 모든 태그별 페이지 경로 추가
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  allTags.forEach((tag) => {
    const encodedTag = encodeURIComponent(tag);

    const totalPostsByTag = allPosts.filter((post) =>
      post.frontMatter.tags.includes(tag),
    ).length;

    const totalPages = Math.ceil(totalPostsByTag / SITE_CONFIG.limitPerPage);

    for (let page = 1; page <= totalPages; page++) {
      urls.push({
        url: `${baseUrl}/tags/${encodedTag}/${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  });

  return urls;
}
