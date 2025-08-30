import rehypePrismPlus from "rehype-prism-plus";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import "prismjs";
import "prismjs/components/prism-java.min";
import "prismjs/components/prism-javascript.min";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css.min";
import "prismjs/components/prism-sql.min";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-gradle";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // markdown 텍스트를 MDAST로 변환
    .use(remarkGfm) // GitHub Flavored Markdown 지원 (테이블, 체크리스트, 취소선 등)
    .use(remarkRehype, { allowDangerousHtml: true }) // MDAST를 HAST로 변환
    .use(rehypeRaw) // 마크다운 내 HTML 허용
    .use(rehypePrismPlus, {
      ignoreMissing: true,
      showLineNumbers: true,
    }) // Prism.js 코드 하이라이팅 (라인 넘버 포함)
    .use(rehypeStringify, { allowDangerousHtml: true }) // HAST를 HTML로 변환
    .process(markdown);

  return String(result);
}
