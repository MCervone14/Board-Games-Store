import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BasketItem } from "@/types/basket";
import { getBasket, getFilters } from "@/actions/server";
import { UserMenu } from "./user-menu";
import BasketDropDownMenu from "../basket/basket-dropdown-menu";
import dynamic from "next/dynamic";

const ComboboxSearch = dynamic(
  () => import("@/components/reusable/combobox-search"),
  {
    ssr: false,
  }
);

const menuItems = [
  { label: "Board Games", href: "/boardgames" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
  { label: "Analytics", href: "/analytics" },
  { label: "System", href: "/system" },
  { label: "Deployments", href: "/deployments" },
  { label: "My Settings", href: "/settings" },
];

export default async function NavbarLayout() {
  const basket = await getBasket();

  const boardGameList = await getFilters();

  const sum =
    basket?.items?.reduce(
      (acc: number, item: BasketItem) => acc + item.quantityInStock,
      0
    ) || 0;

  return (
    <Navbar className="bg-white sticky z-10">
      <div className="flex container justify-between items-center w-full mx-auto py-6 max-h-[100px]">
        <NavbarContent>
          <Sheet>
            <SheetTrigger className="rounded-lg md:hidden flex justify-center items-center">
              <Bars3Icon aria-hidden="true" className=" w-6 h-6" />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="mb-5">Menu</SheetTitle>
              </SheetHeader>
              {menuItems.map((item, index) => (
                <NavbarMenuItem
                  key={`${item.label}-${index}`}
                  className="list-none mb-2"
                >
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    className="w-full hover:bg-white hover:bg-opacity-20 rounded-lg px-4 py-2"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </SheetContent>
          </Sheet>
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit hidden md:block">
              <Image
                src="/images/promotionals/TT_Z_logo.png"
                alt="logo"
                width={150}
                height={50}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="sm:flex" justify="center">
          <ComboboxSearch boardGames={boardGameList} />
        </NavbarContent>
        <NavbarContent justify="end" className="gap-6">
          <UserMenu />
          <NavbarItem>
            <BasketDropDownMenu sum={sum} basket={basket} />
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
