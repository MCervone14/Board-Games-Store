"use client";

import { removeCookie } from "@/actions/server";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface AddProductButtonProps {
  children: React.ReactNode;
}

const LogoutButton = ({ children }: AddProductButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      onClick={() =>
        startTransition(async () => {
          removeCookie("buyerId");
          removeCookie("token");
          removeCookie("user");
          router.push("/");
        })
      }
    >
      {children}
    </DropdownMenuItem>
  );
};

export default LogoutButton;
