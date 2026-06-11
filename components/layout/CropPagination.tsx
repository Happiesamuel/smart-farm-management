"use client";
import { ReactNode } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
interface FinancePaginationProps {
  type?: string;
  total: number;
  pageSize?: number;
  pageKey?: string;
  children?: ReactNode;
}

export default function CropPagination({
  type,
  total,
  pageSize = 5,
  pageKey = "page",
  children,
}: FinancePaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get(pageKey) || 1);
  const totalPages = Math.ceil(total / pageSize);

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageKey, String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  }

  if (totalPages <= 1) return null;
  return (
    <div className="flex sm:flex-row flex-col items-center justify-between mt-4">
      {children}
      <Pagination className="w-full justify-end">
        <PaginationContent className="gap-1 sm:gap-3">
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              className="border text-zinc-700 border-zinc-300"
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                size="sm"
                onClick={() => goToPage(page)}
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
              onClick={() =>
                currentPage < totalPages && goToPage(currentPage + 1)
              }
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
