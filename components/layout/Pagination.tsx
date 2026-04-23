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
          <PaginationPrevious className="border border-zinc-300" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        {/* <PaginationItem><PaginationEllipsis /></PaginationItem> */}
        <PaginationItem>
          <PaginationNext className="border border-zinc-300" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
