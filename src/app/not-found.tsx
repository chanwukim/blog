import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="text-2xl font-bold select-none">404</h1>
      <p className="text-muted-foreground text-sm">페이지를 찾을 수 없어요</p>
      <div className="mt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}
