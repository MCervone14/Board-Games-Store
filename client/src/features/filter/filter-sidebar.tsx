"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

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
    <div>
      <Label>Search</Label>
      <Input
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debouncedSearch(e.target.value);
        }}
        value={searchTerm || ""}
      />
      <div className="mt-5 bg-primary-foreground p-5 rounded">
        <RadioGroup
          defaultValue="name"
          className="space-y-2"
          onValueChange={handleSortingChange}
        >
          {sortOptions.map((item) => (
            <div className="flex items-center space-x-2" key={item.label}>
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value}>{item.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="p-5 bg-primary-foreground mt-5">
        {filters.types.map((item: string) => (
          <div className="flex items-center space-x-2 mt-3" key={item}>
            <div className="flex flex-row items-start space-x-3 space-y-0">
              <Checkbox
                id={item}
                name={item}
                key={item}
                value={item}
                className=""
                onCheckedChange={() => handleCategoryChange(item)}
              />
              <label
                htmlFor={item}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSideBar;
