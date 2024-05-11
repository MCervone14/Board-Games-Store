"use client";

import { fetchProducts } from "@/actions/server";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MetaData } from "@/types/metaData";
import { useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

interface NextPagePaginationProps {
  metaData: MetaData;
}

const NextPagePagination = ({ metaData }: NextPagePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { currentPage, totalPages, pageSize, totalCount } = metaData;

  return (
    <Pagination className="my-10">
      <div className="flex gap-5 justify-center items-center">
        <Button
          onClick={() =>
            startTransition(() => {
              const params = new URLSearchParams(searchParams);
              params.set("pageNumber", (currentPage - 1).toString());
              fetchProducts();
              router.replace(`${pathname}?${params.toString()}`);
            })
          }
          className="p-0 px-3"
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationContent key={index} className="mr-2">
              <PaginationItem>
                <PaginationLink
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
          className="p-0 px-3"
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </Pagination>
  );
};

export default NextPagePagination;
