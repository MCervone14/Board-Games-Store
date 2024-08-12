import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
import { getBasket } from "@/actions/server";
import { UserMenu } from "./user-menu";
import BasketDropDownMenu from "../basket/basket-dropdown-menu";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

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
  const authToken = cookies().get("token")?.value;
  const buyerId = cookies().get("buyerId")?.value;
  let sum = undefined;
  let basket = null;

  if (buyerId) {
    console.log("buyerId", buyerId);
    basket = await getBasket();
    sum =
      basket?.items?.reduce(
        (acc: number, item: BasketItem) => acc + item.quantityInStock,
        0
      ) || 0;
  }

  return (
    <NavigationMenu className="flex justify-between items-center container ">
      <NavigationMenuItem className="flex list-none items-center">
        <Link href="/" className="font-bold text-inherit">
          <Image
            src="/images/promotionals/TT_Z_Logo.png"
            alt="logo"
            width={125}
            height={60}
          />
        </Link>
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
      </NavigationMenuItem>
      <NavigationMenuItem className="flex-1 list-none">
        <Sheet>
          <SheetTrigger className="rounded-lg md:hidden flex justify-center items-center">
            <Bars3Icon aria-hidden="true" className=" w-6 h-6" />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetHeader>
              <SheetTitle className="mb-5">Menu</SheetTitle>
            </SheetHeader>
            {authToken
              ? menuItemsAuth.map((item, index) => (
                  <SheetClose>
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
                      prefetch={false}
                      key={`${item.label}-${index}`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))
              : menuItemsNoAuth.map((item, index) => (
                  <SheetClose
                    key={`${item.label}-${index}`}
                    className="list-none mb-2"
                  >
                    <Link
                      prefetch={false}
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
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
          </SheetContent>
        </Sheet>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none flex">
        <UserMenu token={authToken} />
        <div className="flex">
          <BasketDropDownMenu sum={sum} basket={basket} />
        </div>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
