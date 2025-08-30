import Link from "next/link";

import { cn } from "@/libs/cn";

interface NavTabProps {
  currentTab: "all" | "series";
}

export function NavTab({ currentTab }: NavTabProps) {
  return (
    <nav className="mb-4">
      <h2 className="sr-only">블로그 네비게이션</h2>
      <ul className="flex gap-2">
        <li>
          <Link
            href="/"
            className={cn(
              "border-b-2 border-transparent px-4 py-2 font-medium",
              currentTab === "all" && "text-primary border-primary",
            )}
          >
            전체
          </Link>
        </li>
        <li>
          <Link
            href="/series"
            className={cn(
              "border-b-2 border-transparent px-4 py-2 font-medium",
              currentTab === "series" && "text-primary border-primary",
            )}
          >
            시리즈
          </Link>
        </li>
      </ul>
    </nav>
  );
}
