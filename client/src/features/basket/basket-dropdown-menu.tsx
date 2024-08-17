import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Basket } from "@/types/basket";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import Image from "next/image";
import CartButton from "../buttons/cart-button";
import { cn, ProductPrice } from "@/lib/utils";
import Link from "next/link";
import { Label } from "@/components/ui/label";

interface BasketDropDownMenuProps {
  basket: Basket | null;
  sum: number;
}

const BasketDropDownMenu = ({ sum, basket }: BasketDropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group">
        <Button
          variant="ghost"
          className="relative hover:bg-transparent focus:outline-none"
          aria-label="Shopping Cart button"
        >
          <ShoppingCartIcon className="h-6 w-6 fill-primary/90 group-hover:fill-primary" />
          <Badge
            className={cn(
              `${
                sum > 0 ? "visible" : "hidden"
              } absolute -top-1 right-1 h-4  min-w-[1rem] rounded-full bg-blue-600 px-2 text-white group-hover:text-white group-hover:bg-blue-600`
            )}
          >
            {sum}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[375px] p-4 space-y-4">
        {basket?.items?.map((item) => (
          <div
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
            key={item.productId}
          >
            <Image
              src={item.pictureUrl}
              alt={item.name}
              width={64}
              height={64}
              className="rounded-md max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px]"
            />
            <div className="space-y-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">
                {ProductPrice(item.price, item.salePrice)}
              </p>
            </div>

            <div className="flex items-center">
              <Label>Quantity:</Label>
              <span className="text-lg ml-2">{item.quantity}</span>

              <CartButton
                productId={item.productId}
                quantity={item.quantity}
                method="DELETE"
                cookie={false}
                variant={"ghost"}
                className="hover:bg-transparent"
              >
                <XMarkIcon className="w-5 h-5 rounded-full  hover:text-red-600 hover:bg-red-100" />
              </CartButton>
            </div>
          </div>
        ))}
        {sum === 0 && (
          <div className="flex justify-center">
            No items in your shopping cart!
          </div>
        )}
        <div className="flex gap-3 justify-around">
          <Button
            disabled={sum === 0 || basket?.status === 404 || basket === null}
            className="hover:bg-blue-600 w-1/2"
          >
            <Link className="" href="/basket">
              See Basket Summary
            </Link>
          </Button>
          <Button
            disabled={sum === 0 || basket?.status === 404 || basket === null}
            className="hover:bg-blue-600 w-1/2"
          >
            <Link className="" href="/checkout">
              Go to Checkout
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BasketDropDownMenu;
