"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";

export default function Paginate({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page") || 1);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  }

  if (totalPages <= 1) return null;

  return (
    <Pagination className="w-full pt-8">
      <PaginationContent className="gap-5">
        <PaginationItem>
          <PaginationPrevious
            className="border text-zinc-700 border-zinc-300 cursor-pointer"
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className={`cursor-pointer ${page === currentPage ? "" : "text-zinc-700"}`}
              isActive={page === currentPage}
              onClick={() => goToPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="border text-zinc-700 border-zinc-300 cursor-pointer"
            onClick={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
