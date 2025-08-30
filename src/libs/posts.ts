import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export interface PostMetadata {
  title: string;
  description: string;
  series: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
}

const postsDirectory = path.join(process.cwd(), "posts");

async function readPost(year: string, fileName: string) {
  const fullPath = path.join(postsDirectory, year, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = await fs.promises.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: Post = {
    slug: `${year}/${fileName.replace(/\.md$/, "")}`,
    metadata: {
      title: data.title,
      description: data.description,
      series: data.series || "",
      tags: data.tags || [],
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt || data.publishedAt,
      isPublished: data.isPublished || false,
    },
    content,
  };

  return post;
}

export async function getAllPosts(): Promise<Post[]> {
  const years = fs.readdirSync(postsDirectory).filter((item) => {
    return fs.statSync(path.join(postsDirectory, item)).isDirectory();
  });

  const posts: Post[] = [];

  for (const year of years) {
    const yearDir = path.join(postsDirectory, year);
    const files = fs
      .readdirSync(yearDir)
      .filter((file) => file.endsWith(".md"));

    for (const file of files) {
      const post = await readPost(year, file);
      if (post && post.metadata.isPublished) {
        posts.push(post);
      }
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}

export async function getPost(
  year: string,
  slug: string,
): Promise<Post | null> {
  return await readPost(year, `${slug}.md`);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.metadata.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagSet = new Set<string>();

  allPosts.forEach((post) => {
    post.metadata.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export async function getTagCounts(): Promise<Record<string, number>> {
  const allPosts = await getAllPosts();
  const tagCounts: Record<string, number> = {};

  allPosts.forEach((post) => {
    post.metadata.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return tagCounts;
}

export async function getPostsBySeries(series: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.metadata.series === series);
}

export async function getAllSeries(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const seriesSet = new Set<string>();

  allPosts.forEach((post) => {
    if (post.metadata.series && post.metadata.series.trim() !== "") {
      seriesSet.add(post.metadata.series.trim());
    }
  });

  return Array.from(seriesSet).sort();
}

export async function getSeriesCounts(): Promise<Record<string, number>> {
  const allPosts = await getAllPosts();
  const seriesCounts: Record<string, number> = {};

  allPosts.forEach((post) => {
    if (post.metadata.series) {
      seriesCounts[post.metadata.series] =
        (seriesCounts[post.metadata.series] || 0) + 1;
    }
  });

  return seriesCounts;
}
