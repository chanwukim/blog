import "@/styles/prism-vsc-dark-plus.css";
import "@/styles/prism-plugin.css";

import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import cn from "@/lib/cn";

interface HtmlRendererProps {
  html: string;
  className?: string;
}

export default function HtmlRenderer({ html, className = "" }: HtmlRendererProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={cn("prose dark:prose-invert", className)}
    />
  );
}
