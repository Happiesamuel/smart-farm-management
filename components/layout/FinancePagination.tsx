"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface FinancePaginationProps {
  type: string;
  total: number;
  pageSize?: number;
  pageKey?: string; 
}

export default function FinancePagination({
  type,
  total,
  pageSize = 5,
  pageKey = "page",
}: FinancePaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(pageKey) || 1);
  const totalPages = Math.ceil(total / pageSize);

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total);

  function getPageUrl(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageKey, String(page));
    return `?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-3 text-xs text-gray-500 border-t gap-1">
      <p className="w-full whitespace-nowrap">
        Showing {from} to {to} of {total} {type}
      </p>
      <Pagination className="w-full justify-end">
        <PaginationContent className="gap-1 sm:gap-3">
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              className="border text-zinc-700 border-zinc-300"
              href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                size="sm"
                href={getPageUrl(page)}
                isActive={page === currentPage}
                className={
                  page === currentPage
                    ? "bg-primary-green text-white"
                    : "text-zinc-700"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              size="sm"
              className="border text-zinc-700 border-zinc-300"
              href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}