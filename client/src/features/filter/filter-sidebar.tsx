"use client";

import { Input } from "@/components/ui/input";

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
    categories: string[];
    mechanics: string[];
  };
}

const sortOptions = [
  { value: "name", label: "Name: A-Z" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

const FilterSideBar = ({ filters }: FilterSideBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortItem, setSortItem] = useState("Name");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState({
    sort: false,
    category: false,
    mechanics: false,
  });

  const handleSortingChange = (sortTerm: string) => {
    switch (sortTerm) {
      case "name":
        setSortItem("Name");
        break;
      case "priceDesc":
        setSortItem("Price: High to Low");
        break;
      case "price":
        setSortItem("Price: Low to High");
        break;
    }

    const params = new URLSearchParams(searchParams);
    params.set("orderBy", sortTerm);

    const url = `${params.toString()}`;
    router.replace(`${pathname}?${url}`);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    const categoriesString = params.get("categoriesSelected") || "";
    let categories = categoriesString ? categoriesString.split(",") : [];

    if (categories.includes(category)) {
      categories = categories.filter((item) => item !== category);
    } else {
      categories.push(category);
    }

    if (categories.length > 0) {
      params.set("categoriesSelected", categories.join(","));
    } else {
      params.delete("categoriesSelected");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleMechanicChange = (mechanic: string) => {
    const params = new URLSearchParams(searchParams);
    const mechanicsString = params.get("mechanicsSelected") || "";
    let mechanics = mechanicsString ? mechanicsString.split(",") : [];

    if (mechanics.includes(mechanic)) {
      mechanics = mechanics.filter((item) => item !== mechanic);
    } else {
      mechanics.push(mechanic);
    }

    if (mechanics.length > 0) {
      params.set("mechanicsSelected", mechanics.join(","));
    } else {
      params.delete("mechanicsSelected");
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
    <div className="flex items-center flex-wrap gap-2 p-0 py-5">
      <div className="bg-primary-foreground rounded">
        <DropdownMenu
          open={isOpen.sort}
          onOpenChange={(e) => setIsOpen({ ...isOpen, sort: !isOpen.sort })}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <span className="mr-2">Sort By: {sortItem}</span>
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
      <div className="bg-primary-foreground flex gap-2">
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
          <DropdownMenuContent className="w-56 max-h-56 scroll-smooth overflow-auto">
            {filters.categories.map((item: string) => (
              <DropdownMenuCheckboxItem
                key={item}
                textValue={item}
                checked={
                  searchParams.has("categoriesSelected") &&
                  searchParams
                    .get("categoriesSelected")
                    ?.split(",")
                    .includes(item)
                }
                onCheckedChange={() => handleCategoryChange(item)}
              >
                {item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu
          open={isOpen.mechanics}
          onOpenChange={(e) =>
            setIsOpen({ ...isOpen, mechanics: !isOpen.mechanics })
          }
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <span className="mr-2">Mechanics</span>
              {isOpen.mechanics ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-56 scroll-smooth overflow-auto">
            {filters.mechanics.map((item: string) => (
              <DropdownMenuCheckboxItem
                key={item}
                textValue={item}
                checked={
                  searchParams.has("mechanicsSelected") &&
                  searchParams
                    .get("mechanicsSelected")
                    ?.split(",")
                    .includes(item)
                }
                onCheckedChange={() => handleMechanicChange(item)}
              >
                {item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Input
        aria-label="Search for a game"
        placeholder="Search for a game..."
        className="max-w-sm"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debouncedSearch(e.target.value);
        }}
        value={searchTerm || ""}
      />
      <Button
        className="bg-red-600 py-3 hover:bg-blue-600"
        onClick={() => {
          setSearchTerm("");
          setSortItem("Name");
          const params = new URLSearchParams(searchParams);
          params.delete("searchTerm");
          params.delete("orderBy");
          params.delete("categoriesSelected");
          params.delete("mechanicsSelected");
          router.replace(`${pathname}?${params.toString()}`);
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterSideBar;
