import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { FrontMatter, Post } from "@/types";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  const series = getAllSeries();
  const posts = series.flatMap((seriesName) => {
    return getPostsBySeries(seriesName).map((post) => ({
      ...post,
      series: seriesName,
    }));
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime(),
  );
}

/**
 * @returns ` [ "series-a", "series-b", ... ] `
 */
export function getAllSeries() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export function getPostsBySeries(series: string): Post[] {
  const seriesDirectory = path.join(postsDirectory, series);

  if (!fs.existsSync(seriesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(seriesDirectory);

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(seriesDirectory, fileName);

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        series,
        content,
        frontMatter: data as FrontMatter,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontMatter.publishedAt).getTime() -
        new Date(a.frontMatter.publishedAt).getTime(),
    );
}

export function getPostBySeriesAndSlug(series: string, slug: string): Post {
  const fullPath = path.join(postsDirectory, series, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    series,
    content,
    frontMatter: data as FrontMatter,
  };
}
