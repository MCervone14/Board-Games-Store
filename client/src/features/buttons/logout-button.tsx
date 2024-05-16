"use client";

import { removeCookie } from "@/actions/server";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

interface AddProductButtonProps {
  name: string;
  children: React.ReactNode;
}

const LogoutButton = ({ name, children }: AddProductButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      onClick={() =>
        startTransition(() => {
          removeCookie(name);
          router.push("/boardgames");
        })
      }
    >
      {children}
    </DropdownMenuItem>
  );
};

export default LogoutButton;
