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
      className="bg-blue-600 text-white w-full py-6 rounded-tl-none rounded-r-none"
      variant="default"
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
