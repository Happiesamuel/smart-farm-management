"use client";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Paginate() {
  return (
    <Pagination className="w-full pt-8">
      <PaginationContent className=" gap-5">
        <PaginationItem>
          <PaginationPrevious
            className="border text-zinc-700 border-zinc-300"
            href="#"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-zinc-700" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-zinc-700" href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-zinc-700" href="#">
            3
          </PaginationLink>
        </PaginationItem>
        {/* <PaginationItem><PaginationEllipsis /></PaginationItem> */}
        <PaginationItem>
          <PaginationNext
            className="border text-zinc-700 border-zinc-300"
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
