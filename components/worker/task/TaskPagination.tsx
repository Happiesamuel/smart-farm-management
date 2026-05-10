import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function TaskPagination() {
  return (
    <div className="flex items-center justify-between px-2.5 py-3 text-sm text-dark/80 mt-4 rounded-xl border border-border/80 shadow-xs hover:shadow-sm transition bg-white gap-1">
      <p className="w-full text-xs">Showing 1 to 5 of 24 tasks</p>
      <Pagination className="w-full justify-end ">
        <PaginationContent className=" gap-1 sm:gap-3">
          <PaginationItem>
            <PaginationPrevious
              size={"sm"}
              className="border text-zinc-700 border-zinc-300"
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              size={"sm"}
              href="#"
              isActive
              className="bg-primary-green text-white"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size={"sm"} className="text-zinc-700" href="#">
              2
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>
          <PaginationItem>
            <PaginationNext
              size={"sm"}
              className="border text-zinc-700 border-zinc-300"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
