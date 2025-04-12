import fs from "fs";
import path from "path";

import matter from "gray-matter";

export interface Post {
  slug: string;
  thumbnail: string;
  title: string;
  category: string;
  description?: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

const readPost = async (year: string, fileName: string) => {
  const fullPath = path.join(postsDirectory, year, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = await fs.promises.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const fileNameWithoutExtension = fileName.replace(/\.md$/, "");

  const slug = `${year}/${fileNameWithoutExtension}`;
  const thumbnail = `/images/${fileNameWithoutExtension}/thumbnail.png`;

  return {
    slug,
    thumbnail,
    title: data.title,
    category: data.category,
    tags: data.tags,
    publishedAt: data.publishedAt,
    isPublished: data.isPublished,
    description: data.description,
    content,
  } satisfies Post;
};

export const getAllPosts = async (): Promise<Post[]> => {
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
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const [year, ...slugParts] = slug.split("/");
  const fileName = `${slugParts.join("/")}.md`;
  const post = await readPost(year, fileName);

  if (post && post.isPublished) {
    return post;
  }

  return null;
};

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
};

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
};

export const getAllTags = async (): Promise<string[]> => {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
};

export const getAllCategories = async (): Promise<string[]> => {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
};
