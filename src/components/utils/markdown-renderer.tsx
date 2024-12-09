import "@/styles/prism-vsc-dark-plus.css";

import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import styles from "./markdown-renderer.module.css";

import markdownToHtml from "@/lib/markdown-to-html";

interface MarkdownRendererProps {
  markdown: string;
}

export default async function MarkdownRenderer({
  markdown,
}: MarkdownRendererProps) {
  const html = await markdownToHtml(markdown);

  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
