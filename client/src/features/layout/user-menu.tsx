import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutButton from "../buttons/logout-button";
import AccountButton from "../buttons/account-button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export async function UserMenu() {
  let userId = undefined;
  const user = cookies().get("user")?.value;

  if (user) {
    userId = JSON.parse(user) as User;
  }

  return (
    <>
      {!user ? (
        <div className="hidden sm:flex gap-3">
          <Link href="/login" scroll={false} className="hidden lg:flex">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register" scroll={false}>
            <Button variant="default" className="bg-blue-600">
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 rounded-full">
                <UserCircleIcon className="w-7 h-7 fill-primary/90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <p className="text-center font-bold">{userId?.username}</p>
              <DropdownMenuSeparator />
              {userId?.admin && (
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
        </div>
      )}
    </>
  );
}
