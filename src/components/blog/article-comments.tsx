"use client";

import styles from "./article-comments.module.css";

import cn from "@/lib/cn";
import { SITE_CONFIG } from "@/lib/constants";

interface ArticleCommentsProps {
  className?: string;
}

export default function ArticleComments({ className }: ArticleCommentsProps) {
  return (
    <section
      className={cn(styles.comments, className)}
      ref={(el) => {
        if (!el) {
          return;
        }

        const script = document.createElement("script");

        script.src = "https://utteranc.es/client.js";
        script.async = true;
        script.setAttribute("repo", `${SITE_CONFIG.author.name}/blog`);
        script.setAttribute("issue-term", "pathname");
        script.setAttribute("label", "comment");
        script.setAttribute("theme", "github-light");
        script.setAttribute("crossorigin", "anonymous");

        el.appendChild(script);
      }}
    >
      <h3 className="sr-only">댓글</h3>
    </section>
  );
}
