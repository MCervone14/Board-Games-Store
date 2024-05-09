import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
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
    <Navbar
      className="flex justify-between max-w-7xl mx-auto px-4 py-4 sm:py-6 sticky"
      isBlurred
    >
      <NavbarContent>
        <Sheet>
          <SheetTrigger className="rounded-lg sm:hidden flex justify-center items-center">
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
          <p className="font-bold text-inherit">LOGO HERE</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/boardgames">
            Board Games
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/about" aria-current="page">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-10">
        <NavbarItem>
          <Link href="/basket" className="relative">
            <Button variant={"link"} className="p-0">
              <ShoppingCartIcon className="w-7 h-7" />
              <Badge
                className="rounded-full bg-purple-500 text-black -bottom-3 -right-3 absolute font-bold px-2 outline-none"
                variant={"outline"}
              >
                {sum || 0}
              </Badge>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">
            <Button variant="secondary">Login</Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            <Button variant="default">Sign Up</Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
