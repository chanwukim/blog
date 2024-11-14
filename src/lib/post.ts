import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { Post } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

async function readPost(year: string, fileName: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, year, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = await fs.promises.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: `${year}/${fileName.replace(/\.md$/, "")}`,
    title: data.title,
    category: data.category,
    tags: data.tags,
    publishedAt: data.publishedAt,
    isPublished: data.isPublished,
    description: data.description,
    content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const years = await fs.promises.readdir(postsDirectory);
  const posts: Post[] = [];

  for (const year of years) {
    const yearPath = path.join(postsDirectory, year);
    if (yearPath.split("/").at(-1) === ".DS_Store") {
      continue;
    }
    const files = await fs.promises.readdir(yearPath);

    for (const file of files) {
      if (file.endsWith(".md")) {
        const post = await readPost(year, file);
        if (post && post.isPublished) {
          posts.push(post);
        }
      }
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getPostBySlug(slug: string) {
  const [year, ...slugParts] = slug.split("/");
  const fileName = `${slugParts.join("/")}.md`;
  const post = await readPost(year, fileName);

  if (post && post.isPublished) {
    return post;
  }

  return null;
}
