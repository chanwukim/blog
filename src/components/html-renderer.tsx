import clsx from "clsx";

import "@/styles/prism-vsc-dark-plus.css";
import "@/styles/prism-plugin.css";

import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export type HtmlRendererProps = { html: string; className?: string };

export function HtmlRenderer({ html, className = "" }: HtmlRendererProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx("prose max-w-none", className)}
    />
  );
}
