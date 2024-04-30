"use client";

import { addProductToCart } from "@/actions/server-actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface AddProductButtonProps {
  productId: number;
  quantity: number;
}

const AddProductButton = ({ productId, quantity }: AddProductButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="link"
      onClick={() =>
        startTransition(() => addProductToCart(productId, quantity))
      }
    >
      {isPending ? "Adding to cart..." : "Add to cart"}
    </Button>
  );
};

export default AddProductButton;
