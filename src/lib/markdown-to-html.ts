import rehypePrism from "rehype-prism";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import "prismjs/components/prism-java.min";
import "prismjs/components/prism-javascript.min";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css.min";
import "prismjs/components/prism-sql.min";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-bash";

export default async function markdownToHtml(markdown: string) {
  const result = await unified() // 플러그인 기반의 문서 처리
    .use(remarkParse) // markdown 텍스트를 MDAST (Markdown Abstract Syntax Tree)로 변환
    .use(remarkGfm) // support GFM (autolink literals, footnotes, strikethrough, tables, tasklists)
    .use(remarkRehype, { allowDangerousHtml: true }) // MDAST를 HAST (Hypertext Abstract Syntax Tree)로 변환
    .use(rehypeRaw) // HTML을 허용하기 위해 추가
    .use(rehypePrism, {
      plugins: ["line-numbers", "toolbar", "copy-to-clipboard"],
    }) // prism 하이라이팅
    .use(rehypeStringify, { allowDangerousHtml: true }) // HAST를 HTML 문자열로 변환
    .process(markdown);

  return String(result);
}
