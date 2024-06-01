"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface FilterSideBarProps {
  filters: {
    types: string[];
  };
}

const sortOptions = [
  { value: "name", label: "Name: A-Z" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

const FilterSideBar = ({ filters }: FilterSideBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState({
    sort: false,
    category: false,
  });

  const handleSortingChange = (sortTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("orderBy", sortTerm);

    const url = `${params.toString()}`;
    router.replace(`${pathname}?${url}`);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    const categories = params.getAll("types");

    if (categories.includes(category)) {
      params.delete("types");
      categories.forEach((item) => {
        if (item !== category) {
          params.append("types", item);
        }
      });
    } else {
      params.append("types", category);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("searchTerm", searchTerm);
    if (searchTerm === "") {
      params.delete("searchTerm");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(debounce(handleSearchChange, 700), [
    searchParams,
  ]);

  return (
    <div className="flex items-center container gap-2 p-0 py-5">
      <div className="bg-primary-foreground rounded">
        <DropdownMenu
          open={isOpen.sort}
          onOpenChange={(e) => setIsOpen({ ...isOpen, sort: !isOpen.sort })}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <span className="mr-2">Sort By</span>
              {isOpen.sort ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {sortOptions.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onClick={() => handleSortingChange(item.value)}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-primary-foreground">
        <DropdownMenu
          open={isOpen.category}
          onOpenChange={(e) =>
            setIsOpen({ ...isOpen, category: !isOpen.category })
          }
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <span className="mr-2">Categories</span>
              {isOpen.category ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {filters.types.map((item: string) => (
              <DropdownMenuCheckboxItem
                key={item}
                textValue={item}
                checked={
                  searchParams.has("types") &&
                  searchParams.getAll("types").includes(item)
                }
                onCheckedChange={() => handleCategoryChange(item)}
              >
                {item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Label className="mr-2">Search</Label>
      <Input
        placeholder="Search for a game..."
        className="max-w-sm"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debouncedSearch(e.target.value);
        }}
        value={searchTerm || ""}
      />
    </div>
  );
};

export default FilterSideBar;
