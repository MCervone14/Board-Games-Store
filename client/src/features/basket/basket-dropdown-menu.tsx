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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Label } from "@/components/ui/label";

interface BasketDropDownMenuProps {
  basket: Basket;
  sum: number;
}

const BasketDropDownMenu = ({ sum, basket }: BasketDropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group">
        <Button
          variant="ghost"
          className="relative hover:bg-transparent focus:outline-none"
        >
          <ShoppingCartIcon className="h-7 w-7 fill-primary/90 group-hover:fill-primary" />
          <Badge
            className={cn(
              `${
                sum > 0 ? "visible" : "hidden"
              } absolute -top-1 right-1 h-4  min-w-[1rem] rounded-full bg-blue-600 px-1 text-white group-hover:text-white group-hover:bg-blue-600`
            )}
          >
            {sum}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] p-4 space-y-4">
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
              className="rounded-md"
            />
            <div className="space-y-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">
                ${((item.price * item.quantityInStock) / 100).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center">
              <Label>Quantity:</Label>
              <span className="text-lg ml-2">{item.quantityInStock}</span>

              <CartButton
                productId={item.productId}
                quantity={item.quantityInStock}
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
        {(basket?.items?.length === 0 || basket === null) && (
          <div className="flex justify-center">
            No items in your shopping cart!
          </div>
        )}
        <div className="flex gap-3 justify-around">
          <Button
            disabled={basket?.items?.length === 0}
            className="hover:bg-blue-600 w-1/2"
          >
            <Link className="" href="/basket">
              See Basket Summary
            </Link>
          </Button>
          <Button
            disabled={basket?.items?.length === 0}
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
