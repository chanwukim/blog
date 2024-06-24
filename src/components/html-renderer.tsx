import "@/styles/prism-vsc-dark-plus.css";
import "@/styles/prism-plugin.css";

import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export type HtmlRendererProps = { html: string };

export function HtmlRenderer({ html }: HtmlRendererProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose max-w-none"
    />
  );
}
