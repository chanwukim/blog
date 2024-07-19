import Link from "next/link";

import clsx from "clsx";

const variants = {
  light: "bg-gray-100 text-gray-500",
  filled: "bg-gray-900 text-white",
} as const;

export type TagProps = {
  name: string;
  href?: string;
  variant?: keyof typeof variants;
};

export function Tag({ name, href, variant = "light" }: TagProps) {
  return (
    <Link
      href={href ? href : `/tags/${name}/1`}
      className={clsx(variants[variant], "rounded-full px-3 py-1 text-sm font-medium")}
    >
      {name}
    </Link>
  );
}
