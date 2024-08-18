import Link from "next/link";

const PAGE_GROUP_SIZE = 5;

interface PaginationLinkProps {
  isActive?: boolean;
  href: string;
  children: React.ReactNode;
}

function PaginationLink({ isActive = false, href, children }: PaginationLinkProps) {
  if (isActive) {
    return (
      <span className="inline-flex h-10 w-10 select-none items-center justify-center rounded text-sm font-medium underline underline-offset-4">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex h-10 w-10 select-none items-center justify-center rounded text-sm font-medium underline-offset-4 transition-[background-color] hover:underline"
    >
      {children}
    </Link>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

export function Pagination({ currentPage, totalPages, basePath = "" }: PaginationProps) {
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNums = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const hasPrev = currentGroup > 0;
  const hasNext = endPage < totalPages;

  return (
    <nav className="mt-10 flex justify-center">
      <h1 className="sr-only">페이지네이션</h1>
      <ul className="flex gap-2">
        {hasPrev && (
          <li>
            <PaginationLink href={`${basePath}/${startPage - 1}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
              </svg>
            </PaginationLink>
          </li>
        )}

        {pageNums.map((pageNum) => (
          <li key={pageNum}>
            <PaginationLink isActive={pageNum === currentPage} href={`${basePath}/${pageNum}`}>
              {pageNum}
            </PaginationLink>
          </li>
        ))}

        {hasNext && (
          <li>
            <PaginationLink href={`${basePath}/${endPage + 1}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
              </svg>
            </PaginationLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
