"use client";

import { fetchProducts } from "@/actions/server";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { MetaData } from "@/types/metaData";
import { useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface NextPagePaginationProps {
  metaData: MetaData;
}

const NextPagePagination = ({ metaData }: NextPagePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { currentPage, totalPages, pageSize, totalCount } = metaData;

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  console.log("metaData", metaData);

  return (
    <Pagination className={`my-10 ${pathname == "/" && "hidden"}`}>
      <div className="flex gap-4 w-full justify-between items-center">
        <p className="text-center text-lg">
          <span className="font-bold">Showing</span>
          {` ${startIndex} - ${endIndex} of ${totalCount} `}
        </p>
        <div className="flex gap-1">
          <Button
            onClick={() =>
              startTransition(() => {
                const params = new URLSearchParams(searchParams);
                params.set("pageNumber", (currentPage - 1).toString());
                fetchProducts();
                router.replace(`${pathname}?${params.toString()}`);
              })
            }
            className="p-0 px-2 disabled:hidden"
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationContent key={index}>
                <PaginationItem>
                  <PaginationLink
                    className={`${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "text-black"
                    }`}
                    href="#"
                    isActive={currentPage === pageNumber}
                    onClick={() =>
                      startTransition(() => {
                        const params = new URLSearchParams(searchParams);
                        params.set("pageNumber", pageNumber.toString());
                        fetchProducts();
                        router.replace(`${pathname}?${params.toString()}`);
                      })
                    }
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            );
          })}
          <Button
            onClick={() =>
              startTransition(() => {
                const params = new URLSearchParams(searchParams);
                params.set("pageNumber", (currentPage + 1).toString());
                fetchProducts();
                router.replace(`${pathname}?${params.toString()}`);
              })
            }
            className="p-0 px-2 disabled:hidden "
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Pagination>
  );
};

export default NextPagePagination;
