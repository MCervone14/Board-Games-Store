import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { NavbarItem } from "@nextui-org/navbar";
import { getCurrentUser } from "@/actions/server";
import { cookies } from "next/headers";
import LogoutButton from "../buttons/logout-button";
import OrdersButton from "../buttons/orders-button";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export async function UserMenu() {
  const authToken = cookies().get("token")?.value;
  let user = await getCurrentUser(authToken);

  return (
    <>
      {!user ? (
        <div className="hidden md:flex gap-2">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/register">
              <Button variant="default" className="bg-blue-600">
                Sign Up
              </Button>
            </Link>
          </NavbarItem>
        </div>
      ) : (
        <NavbarItem className="hidden md:flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 rounded-full">
                <UserCircleIcon className="w-8 h-8 fill-primary/90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <p className="text-sm px-2">{user.email}</p>
              <DropdownMenuSeparator />
              {user.admin && (
                <Link href="/inventory">
                  <DropdownMenuItem>Admin Panel</DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <OrdersButton>Orders</OrdersButton>
              <LogoutButton>Logout</LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
      )}
    </>
  );
}
