"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const categories = [
  { id: 0, label: "Board Games", href: "/boardgames" },
  {
    id: 1,
    label: "Card Games",
    href: "/boardgames?categoriesSelected=Card+Game",
  },
  {
    id: 2,
    label: "Game Books",
    href: "/boardgames?categoriesSelected=Game+Book",
  },
  { id: 3, label: "Comics", href: "/boardgames?categoriesSelected=Comics" },
];

const CategoriesNavbar = () => {
  const router = useRouter();

  return (
    <NavigationMenu className="bg-gray-100 dark:bg-gray-800 py-3 top-[100px] z-10">
      <NavigationMenuContent className="w-full pr-20">
        <div className="container flex justify-center gap-4 overflow-x-auto flex-wrap">
          {categories.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Button
                variant="outline"
                className={`min-w-[120px] justify-center inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors
                 hover:bg-gray-300 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50
                  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 ${
                    index === item.id && "border-2 border-blue-600"
                  } `}
                onClick={() => {
                  router.push(item.href);
                  router.refresh();
                }}
              >
                {item.label}
              </Button>
            </NavigationMenuItem>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenu>
  );
};

export default CategoriesNavbar;
