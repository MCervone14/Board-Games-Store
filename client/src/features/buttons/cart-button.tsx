"use client";

import { CartActionButton } from "@/actions/server";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

interface AddProductButtonProps {
  productId: number;
  quantity: number;
  method: string;
  cookie?: boolean;
  children: React.ReactNode;
  variant?: "default" | "ghost" | "outline" | "link" | "destructive";
  className?: string;
}

const CartButton = ({
  productId,
  quantity,
  method,
  cookie,
  children,
  className,
  variant = "default",
}: AddProductButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={cn(className, "w-full py-6 rounded-tl-none rounded-r-none")}
      variant={variant}
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
