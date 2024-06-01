import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { BasketItem } from "@/types/basket";
import { getBasket } from "@/actions/server";
import { UserMenu } from "./user-menu";
import { Input } from "@/components/ui/input";

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

  const sum =
    basket?.items?.reduce(
      (acc: number, item: BasketItem) => acc + item.quantity,
      0
    ) || 0;

  return (
    <Navbar className="bg-white sticky z-10">
      <div className="flex max-w-7xl justify-between items-center w-full mx-auto py-6">
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
              TableTopJunkie
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="sm:flex w-full" justify="center">
          <div className="flex-1 max-w-xl md:max-w-sm lg:max-w-xl mx-auto px-5">
            <div className="relative">
              <Input
                className="w-full rounded-full h-12 pr-10"
                placeholder="Search for board games..."
                type="search"
              />
              <Button
                className="absolute top-1/2 right-3 -translate-y-1/2"
                size="icon"
                variant="ghost"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-6">
          <UserMenu />
          <NavbarItem>
            <Link href="/basket" className="relative">
              <Button variant={"link"} className="p-0 group">
                <ShoppingCartIcon className="w-7 h-7 fill-gray-600 group-hover:fill-gray-800" />
                <Badge
                  className="rounded-full bg-blue-600 text-white -bottom-3 -right-3 absolute font-bold px-2 outline-none "
                  variant={"outline"}
                >
                  {sum || 0}
                </Badge>
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
