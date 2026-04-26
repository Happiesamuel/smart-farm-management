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
export default function CropPagination({ children }: { children?: ReactNode }) {
  return (
    <div className="flex sm:flex-row flex-col items-center justify-between">
      {children}
      <Pagination className="w-full justify-end pt-8">
        <PaginationContent className=" gap-3">
          <PaginationItem>
            <PaginationPrevious
              className="border text-zinc-700 border-zinc-300"
              href="#"
            />
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
            <PaginationLink className="text-zinc-700" href="#">
              2
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className="border text-zinc-700 border-zinc-300"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
