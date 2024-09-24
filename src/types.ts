export interface FrontMatter {
  title: string;
  summary: string;
  tags?: string[];
  publishedAt: string;
  isPublished: boolean;
}

export interface Post {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
  series: string;
}

export type PropsWithChidren<P = unknown> = Readonly<
  P & {
    children?: React.ReactNode;
  }
>;
