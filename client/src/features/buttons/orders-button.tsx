"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface OrdersButtonProps {
  children: React.ReactNode;
}

const OrdersButton = ({ children }: OrdersButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      onClick={() =>
        startTransition(async () => {
          router.push("/orders");
        })
      }
    >
      {children}
    </DropdownMenuItem>
  );
};

export default OrdersButton;
