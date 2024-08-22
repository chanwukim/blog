import Link from "next/link";

import clsx from "clsx";

const variants = {
  ghost: "text-foreground-muted hover:underline",
  filled: "bg-background-muted",
} as const;

export interface TagProps {
  name: string;
  href?: string;
  variant?: keyof typeof variants;
}

export function Tag({ name, href, variant = "ghost" }: TagProps) {
  return (
    <Link
      href={href ? href : `/tags/${name}/1`}
      className={clsx(
        variants[variant],
        "inline-flex items-center justify-center px-3 py-2 text-xs font-medium",
      )}
    >
      {name}
    </Link>
  );
}
