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
import LogoutButton from "../buttons/logout-button";
import AccountButton from "../buttons/account-button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { User } from "@/types/user";

interface UserMenuProps {
  user?: User;
}

export async function UserMenu({ user }: UserMenuProps) {
  return (
    <>
      {!user ? (
        <div className="hidden sm:flex gap-3">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login" scroll={false}>
              <Button variant="outline">Login</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/register" scroll={false}>
              <Button variant="default" className="bg-blue-600">
                Sign Up
              </Button>
            </Link>
          </NavbarItem>
        </div>
      ) : (
        <NavbarItem className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 rounded-full">
                <UserCircleIcon className="w-7 h-7 fill-primary/90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <p className="text-sm px-2">{user.email}</p>
              <DropdownMenuSeparator />
              {user.admin && (
                <Link href="/inventory">
                  <DropdownMenuItem className="bg-red-500 hover:bg-red-300">
                    Admin Panel
                  </DropdownMenuItem>
                </Link>
              )}
              <AccountButton>Account</AccountButton>
              <LogoutButton>Logout</LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
      )}
    </>
  );
}
