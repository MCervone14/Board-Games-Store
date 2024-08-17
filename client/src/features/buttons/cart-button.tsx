"use client";

import { CartActionButton } from "@/actions/server";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import LoadingIndicator from "../layout/loading-indicator";

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
  children,
  className,
  variant = "default",
}: AddProductButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={cn(className, "w-full py-6 rounded-t-none")}
      variant={variant}
      disabled={isPending}
      onClick={() =>
        startTransition(() => CartActionButton(productId, quantity, method))
      }
    >
      {isPending ? <LoadingIndicator /> : children}
    </Button>
  );
};

export default CartButton;
