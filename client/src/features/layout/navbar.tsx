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
  SheetClose,
} from "@/components/ui/sheet";
import { BasketItem } from "@/types/basket";
import { getBasket, getCurrentUser, getFilters } from "@/actions/server";
import { UserMenu } from "./user-menu";
import BasketDropDownMenu from "../basket/basket-dropdown-menu";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

const ComboboxSearch = dynamic(
  () => import("@/components/reusable/combobox-search"),
  {
    ssr: false,
  }
);

const menuItemsNoAuth = [
  { label: "Board Games", href: "/boardgames" },
  { label: "Cards Games", href: "/boardgames?categoriesSelected=Card+Game" },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/register" },
];

const menuItemsAuth = [
  { label: "Board Games", href: "/boardgames" },
  { label: "Cards Games", href: "/boardgames?categoriesSelected=Card+Game" },
  { label: "Orders", href: "/orders" },
  { label: "Logout", href: "/logout" },
];

export default async function NavbarLayout() {
  const basket = await getBasket();
  const { boardGameList } = await getFilters();
  const authToken = cookies().get("token")?.value;
  let user = await getCurrentUser(authToken);

  if (!boardGameList) {
    return [];
  }

  if (!basket) {
    return notFound();
  }

  const sum =
    basket?.items?.reduce(
      (acc: number, item: BasketItem) => acc + item.quantityInStock,
      0
    ) || 0;

  return (
    <Navbar className="bg-white  sticky top-0 left-0 z-10 min-h-[60px]">
      <div className="flex container justify-between items-center w-full mx-auto">
        <NavbarContent>
          <Sheet>
            <SheetTrigger className="rounded-lg md:hidden flex justify-center items-center">
              <Bars3Icon aria-hidden="true" className=" w-6 h-6" />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <SheetHeader>
                <SheetTitle className="mb-5">Menu</SheetTitle>
              </SheetHeader>
              {user
                ? menuItemsAuth.map((item, index) => (
                    <Link
                      color={
                        index === 2
                          ? "primary"
                          : index === menuItemsAuth.length - 1
                          ? "danger"
                          : "foreground"
                      }
                      className="w-full hover:bg-white hover:bg-opacity-20 rounded-lg px-4 py-2"
                      href={item.href}
                    >
                      <SheetClose>
                        <NavbarMenuItem
                          key={`${item.label}-${index}`}
                          className="list-none mb-2"
                        >
                          {item.label}
                        </NavbarMenuItem>
                      </SheetClose>
                    </Link>
                  ))
                : menuItemsNoAuth.map((item, index) => (
                    <Link
                      color={
                        index === 2
                          ? "primary"
                          : index === menuItemsNoAuth.length - 1
                          ? "danger"
                          : "foreground"
                      }
                      className="w-full hover:bg-white hover:bg-opacity-20 rounded-lg px-4 py-2"
                      href={item.href}
                    >
                      <SheetClose>
                        <NavbarMenuItem
                          key={`${item.label}-${index}`}
                          className="list-none mb-2"
                        >
                          {item.label}
                        </NavbarMenuItem>
                      </SheetClose>
                    </Link>
                  ))}
            </SheetContent>
          </Sheet>
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit hidden md:block">
              <Image
                src="/images/promotionals/TT_Z_Logo.png"
                alt="logo"
                width={125}
                height={50}
              />
            </Link>
          </NavbarBrand>
          <Link href={"/boardgames"} className="hidden md:block">
            <Button
              variant="link"
              size={"sm"}
              className="text-md hover:text-blue-600"
            >
              Board Games
            </Button>
          </Link>
          <Link
            href={"/boardgames?categoriesSelected=Card+Game"}
            className=" hidden md:block"
          >
            <Button
              variant="link"
              size={"sm"}
              className="text-md hover:text-blue-600"
            >
              Card Games
            </Button>
          </Link>
        </NavbarContent>
        <NavbarContent className="hidden md:flex"></NavbarContent>
        <NavbarContent>
          <NavbarItem className="flex">
            <UserMenu user={user} />
            <BasketDropDownMenu sum={sum} basket={basket} />
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
