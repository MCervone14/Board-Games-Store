"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface AccountButtonProps {
  children: React.ReactNode;
}

const AccountButton = ({ children }: AccountButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      onClick={() =>
        startTransition(async () => {
          router.push("/account");
        })
      }
    >
      {children}
    </DropdownMenuItem>
  );
};

export default AccountButton;
