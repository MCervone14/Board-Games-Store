"use client";

import { handleAddToCart } from "@/actions/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasketItem } from "@/types/basket";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import LoadingIndicator from "../layout/loading-indicator";

interface DetailsViewCartButtonProps {
  quantityInStock: number;
  productId: string;
  basket: {
    buyerId: number;
    items: BasketItem[];
    status?: number;
    subtotal: number;
  };
}

const DetailsViewCartButton = ({
  quantityInStock,
  productId,
  basket,
}: DetailsViewCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(1);

  const numberOfProductInBasket =
    basket?.items?.find((item) => item.productId === Number(productId))
      ?.quantityInStock || 0;

  const handleClick = (e: any) => {
    const { id } = e.currentTarget;

    if (id === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          startTransition(() => {
            handleAddToCart(formData);
          });
        }}
        className="flex flex-col gap-3 items-center justify-center"
      >
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-1 items-center">
            <Button
              className="hover:text-blue-600"
              type="button"
              variant={"ghost"}
              onClick={handleClick}
              id="minus"
              disabled={quantity <= 1}
            >
              <MinusCircleIcon className="w-7 h-7" />
            </Button>
            <Input
              id="quantity"
              name="quantity"
              className="py-5 min-w-[35px] mx-auto"
              defaultValue={quantity}
              value={quantity}
            />
            <Input type="hidden" name="productId" value={productId} />
            <Button
              className="hover:text-blue-600"
              type="button"
              id="plus"
              variant="ghost"
              onClick={handleClick}
              disabled={
                quantity >= quantityInStock ||
                quantity >= quantityInStock - numberOfProductInBasket
              }
            >
              <PlusCircleIcon className="w-7 h-7" />
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="p-5 w-full hover:bg-blue-600"
          disabled={quantityInStock === numberOfProductInBasket}
        >
          {isPending ? (
            <LoadingIndicator />
          ) : quantityInStock === 0 ? (
            "Out of Stock"
          ) : (
            "Add to Cart"
          )}
        </Button>
      </form>
    </>
  );
};

export default DetailsViewCartButton;
