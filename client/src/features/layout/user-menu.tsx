import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { NavbarItem } from "@nextui-org/navbar";
import { getCurrentUser } from "@/actions/server";
import { cookies } from "next/headers";
import LogoutButton from "../buttons/logout-button";
import OrdersButton from "../buttons/orders-button";

export async function UserMenu() {
  const authToken = await cookies().get("token");
  let user = await getCurrentUser(authToken?.value);

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
              <Button variant="outline">{user.email}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
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
