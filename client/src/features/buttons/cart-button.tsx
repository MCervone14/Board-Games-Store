"use client";

import { CartActionButton } from "@/actions/server";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface AddProductButtonProps {
  productId: number;
  quantity: number;
  method: string;
  cookie?: boolean;
  children: React.ReactNode;
}

const CartButton = ({
  productId,
  quantity,
  method,
  cookie,
  children,
}: AddProductButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="link"
      onClick={() =>
        startTransition(() =>
          CartActionButton(productId, quantity, method, cookie)
        )
      }
    >
      {children}
    </Button>
  );
};

export default CartButton;
