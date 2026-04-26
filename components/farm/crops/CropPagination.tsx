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
export default function CropPagination() {
  return (
    <Pagination className="w-full justify-end pt-8">
      <PaginationContent className=" gap-5">
        <PaginationItem>
          <PaginationPrevious className="border border-zinc-300" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="bg-primary-green text-white"
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext className="border border-zinc-300" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
