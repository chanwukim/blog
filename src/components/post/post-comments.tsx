"use client";

import SITE_CONFIG from "@/constants/site-config";

interface PostCommentsProps {
  className?: string;
}

export default function PostComments({ className = "" }: PostCommentsProps) {
  return (
    <section
      className={className}
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
      <h1 className="hidden">댓글</h1>
    </section>
  );
}
