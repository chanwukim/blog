import Link from "next/link";

import markdownToHtml from "@/lib/markdown-to-html";

import type { Post } from "@/types";

import HtmlRenderer from "../html-renderer";

import PostComments from "./post-comments";
import PostMetadata from "./post-metadata";

interface PostProps {
  post: Post;
}

export default async function PostDetail({ post }: PostProps) {
  const { frontMatter } = post;
  const html = await markdownToHtml(post.content);
  return (
    <>
      <div className="mb-1 mt-4 md:mt-0">
        <Link href={`/${post.series}`} className="inline-flex items-center text-sm hover:underline">
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="mr-1.5 mt-0.5"
          >
            <path d="M184,112a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h64A8,8,0,0,1,184,112Zm-8,24H112a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm48-88V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H72V48H48Zm160,0V48H88V208H208Z"></path>
          </svg>
          {post.series}
        </Link>
      </div>
      <article className="w-full">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold leading-normal">{frontMatter.title}</h1>
          <PostMetadata content={post.content} publishedAt={frontMatter.publishedAt} />
        </header>
        <HtmlRenderer html={html} />
      </article>
      <PostComments className="mt-14" />
    </>
  );
}
