"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface ComboboxSearchProps {
  boardGames: string[];
}

const ComboboxSearch = ({ boardGames }: ComboboxSearchProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSearchTermChange = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("searchTerm", searchTerm);

    router.replace(`${pathname}?${params.toString()}`);
    if (pathname !== "/boardgames") {
      router.push(`/boardgames?searchTerm=${searchTerm}`);
    }
    if (searchTerm === "") {
      params.delete("searchTerm");
    }
  };

  return (
    <React.Suspense fallback={<Button>Loading...</Button>}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[375px] h-12 rounded-2xl justify-between"
          >
            {value
              ? boardGames.find((boardgame) => boardgame === value)
              : "Quick Search..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[375px] p-0">
          <Command>
            <CommandInput
              placeholder="Search for Tabletop Games..."
              className="h-9 w-4/5"
            />
            <Button
              onClick={() => {
                setValue("");
                setSearchTerm("");
                setOpen(false);
              }}
              className="w-1/5 absolute right-0 top-0 h-9 rounded-none rounded-tr-md"
              variant="destructive"
            >
              Clear
            </Button>
            <CommandList>
              <CommandEmpty>No Product Found. Try Another Title.</CommandEmpty>
              <CommandGroup>
                {boardGames?.map((boardGame) => (
                  <CommandItem
                    key={boardGame}
                    value={boardGame}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setSearchTerm(currentValue);
                      onSearchTermChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    {boardGame}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === boardGame ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </React.Suspense>
  );
};

export default ComboboxSearch;
