"use client";

import Link from "next/link";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { usePathname } from "next/navigation";

const categories = [
  { label: "Board Games", href: "/boardgames" },
  { label: "Card Games", href: "/cardgames" },
  { label: "Game Books", href: "/gamebooks" },
  { label: "Comics", href: "/comics" },
];

const CategoriesNavbar = () => {
  const pathname = usePathname();
  return (
    <Navbar className="bg-gray-100 dark:bg-gray-800 py-3 sticky top-24 z-10">
      <NavbarContent justify="center" className="w-full pr-20">
        <div className="container flex justify-center gap-4 overflow-x-auto flex-wrap">
          {categories.map((item, index) => (
            <NavbarItem>
              <Link
                className={`min-w-[120px] justify-center inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors
                 hover:bg-gray-300 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50
                  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 ${
                    pathname === item.href && "border-2 border-blue-600"
                  } `}
                href={item.href}
                key={index}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default CategoriesNavbar;
