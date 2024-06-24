export type FrontMatter = {
  title: string;
  summary: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
};

export type Post = {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
};
