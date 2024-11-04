import styles from "./html-renderer.module.css";
import "@/styles/prism-vsc-dark-plus.css";

import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface HtmlRendererProps {
  html: string;
}

export default function HtmlRenderer({ html }: HtmlRendererProps) {
  return (
    <div className={styles.html} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
