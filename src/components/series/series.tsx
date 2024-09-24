import Link from "next/link";

import { getAllSeries } from "@/lib/posts/v2";

export default function Series({ className }: { className?: string }) {
  const series = getAllSeries();
  return (
    <nav className={className}>
      <h1 className="sr-only">시리즈</h1>
      <ul>
        {series.map((s) => (
          <li key={s} className="my-1.5">
            <Link
              href={`/${s}`}
              className="flex w-full items-center py-1 pl-1 text-sm hover:underline"
            >
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
