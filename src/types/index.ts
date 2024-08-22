export interface FrontMatter {
  title: string;
  summary: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
}

export interface Post {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
}
