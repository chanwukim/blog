import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { FrontMatter, Post } from "@/types";

const postsDirectory = path.join(process.cwd(), "content/posts");

/**
 * @returns [ 'year/title', 'year/title' ... ]
 */
export function getAllPostSlugs(): string[] {
  const years = fs.readdirSync(postsDirectory);
  const slugs: string[] = [];

  years.forEach((year) => {
    const yearPath = path.join(postsDirectory, year);
    const files = fs.readdirSync(yearPath);

    files.forEach((file) => {
      if (file.endsWith(".md")) {
        slugs.push(`${year}/${file.replace(/\.md$/, "")}`);
      }
    });
  });

  return slugs.reverse();
}

export function getPostByYearAndSlug(year: string, slug: string) {
  const fullPath = path.join(postsDirectory, `${year}/${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  const frontMatter: FrontMatter = {
    title: data.title,
    summary: data.summary,
    tags: data.tags,
    publishedAt: data.publishedAt,
    isPublished: data.isPublished,
  };

  const post: Post = {
    slug: `${year}/${slug}`,
    frontMatter,
    content,
  };

  return post;
}

export function getAllPosts() {
  return getAllPostSlugs()
    .map((s) => {
      const [year, slug] = s.split("/");
      return getPostByYearAndSlug(year, slug);
    })
    .filter(
      (post): post is Post => post !== null && post.frontMatter.isPublished,
    )
    .sort(
      (a, b) =>
        new Date(b.frontMatter.publishedAt).getTime() -
        new Date(a.frontMatter.publishedAt).getTime(),
    );
}

export function getPaginatedPosts(page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = start + limit;

  return getAllPosts().slice(start, end);
}

export function getAllTags() {
  const tags = getAllPosts().reduce<string[]>((prev: string[], currentPost) => {
    if (currentPost && currentPost.frontMatter.tags) {
      currentPost.frontMatter.tags.forEach((tag) => prev.push(tag));
    }

    return prev;
  }, []);

  // 내림차순
  return Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b));
}

export function getPostCount() {
  const posts = getAllPosts();
  return posts.length;
}
