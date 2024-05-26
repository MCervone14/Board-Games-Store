"use client";

import { handleAddToCart } from "@/actions/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasketItem } from "@/types/basket";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

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
  const [quantity, setQuantity] = useState(1);

  const numberOfProductInBasket =
    basket?.items?.find((item) => item.productId === Number(productId))
      ?.quantity || 0;

  const handleClick = (e: any) => {
    const { id } = e.currentTarget;

    console.log(e.target);

    if (id === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <form
        action={handleAddToCart}
        className="flex flex-col gap-3 items-center justify-center"
      >
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="quantity">Quantity</Label>
          <div className="flex gap-2 items-center">
            <Button
              type="button"
              variant={"ghost"}
              onClick={handleClick}
              id="minus"
              disabled={quantity <= 1}
            >
              <MinusCircleIcon className="w-8 text-gray-200 hover:text-gray-100" />
            </Button>
            <Input
              id="quantity"
              name="quantity"
              className="py-5"
              value={quantity}
            />
            <Input type="hidden" name="productId" value={productId} />
            <Button
              type="button"
              id="plus"
              variant="ghost"
              onClick={handleClick}
              disabled={
                quantity >= quantityInStock ||
                quantity >= quantityInStock - numberOfProductInBasket
              }
            >
              <PlusCircleIcon className="w-8 text-gray-200 hover:text-gray-100" />
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="p-5 w-full"
          disabled={quantityInStock === numberOfProductInBasket}
        >
          {quantityInStock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </form>
    </>
  );
};

export default DetailsViewCartButton;