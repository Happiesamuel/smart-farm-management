import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BothPagination({ type }: { type: string }) {
  return (
    <div className="flex items-center absolute bottom-0 bg-zinc-200/50 w-full justify-between px-2 py-3 text-xs text-gray-500 border-t gap-1">
      <p className="w-full">Showing 1 to 5 of 24 {type}</p>
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
