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
}

export default function TaskPagination({
  type,
  total,
  pageSize = 5,
  pageKey = "page",
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
    <div className="flex items-center justify-between px-2.5 py-3 text-sm text-dark/80 mt-4 rounded-xl border border-border/80 shadow-xs hover:shadow-sm transition bg-white gap-1">
      <p className="w-full text-xs">
        {" "}
        Showing {from} to {to} of {total} {type}
      </p>
      <Pagination className="w-full justify-end">
        <PaginationContent className="gap-1 sm:gap-3">
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              className="border text-zinc-700 border-zinc-300 cursor-pointer"
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                size="sm"
                isActive={page === currentPage}
                className={`cursor-pointer ${page === currentPage ? "bg-primary-green text-white" : "text-zinc-700"}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              size="sm"
              className="border text-zinc-700 border-zinc-300 cursor-pointer"
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
