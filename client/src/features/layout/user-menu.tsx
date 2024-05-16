import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NavbarItem } from "@nextui-org/navbar";
import { getCurrentUser, removeCookie } from "@/actions/server";
import { cookies } from "next/headers";
import LogoutButton from "../buttons/logout-button";

export async function UserMenu() {
  const authToken = await cookies().get("token");
  let user = await getCurrentUser(authToken?.value);

  return (
    <>
      {!user ? (
        <>
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/register">
              <Button variant="default">Sign Up</Button>
            </Link>
          </NavbarItem>
        </>
      ) : (
        <NavbarItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{user.email}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <LogoutButton name="token">Logout</LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
      )}
    </>
  );
}
