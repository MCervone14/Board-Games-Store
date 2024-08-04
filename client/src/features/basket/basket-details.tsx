import {
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Basket, BasketItem } from "@/types/basket";
import Image from "next/image";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import CartButton from "../buttons/cart-button";
import BasketSummary from "./basket-summary";
import { ProductPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BasketDetailsProps {
  basket: Basket;
}

const BasketDetails = async ({ basket }: BasketDetailsProps) => {
  return (
    <>
      <TableBody>
        {basket?.items?.map((item: BasketItem) => (
          <TableRow
            key={item.productId}
            className="flex flex-col sm:flex-row relative"
          >
            <TableCell className="m-auto">
              <CartButton
                productId={item.productId}
                quantity={item.quantityInStock}
                method="DELETE"
                cookie={false}
                variant="ghost"
                className="p-0 max-w-[50px] absolute top-1 right-1 sm:top-6 "
              >
                <XMarkIcon className="w-5 h-5 rounded-full  hover:text-red-600 hover:bg-red-100" />
              </CartButton>
            </TableCell>
            <TableCell className="m-auto">
              <Image
                src={item.pictureUrl}
                width={84}
                height={84}
                alt={item.name}
                className="min-w-[84px] min-h-[84px] max-w-[84px] max-h-[84px]"
              />
            </TableCell>
            <TableCell className="font-medium m-auto text-center flex-1">
              {item.name}
            </TableCell>
            <TableCell className="m-auto">
              {ProductPrice(item?.price, item?.salePrice)}
            </TableCell>
            <TableCell className="text-center m-auto min-w-[200px] flex items-center justify-center">
              <CartButton
                productId={item.productId}
                quantity={1}
                method="DELETE"
                cookie={false}
                variant="ghost"
                className="p-0 max-w-[50px]"
              >
                <MinusCircleIcon className="w-6 h-6 text-primary/90" />
              </CartButton>
              {item.quantityInStock}
              <CartButton
                productId={item.productId}
                quantity={1}
                method="POST"
                cookie={true}
                variant="ghost"
                className="p-0 max-w-[50px]"
              >
                <PlusCircleIcon className="w-6 h-6 text-primary/90" />
              </CartButton>
            </TableCell>
            <TableCell className="font-bold m-auto w-[200px]">
              $
              {(
                ((item.salePrice || item.price) * item.quantityInStock) /
                100
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
        {basket?.items?.length === 0 && (
          <TableRow className="flex flex-col justify-center items-center">
            <TableCell className="text-2xl flex justify-center items-center">
              Your cart is empty!
            </TableCell>
            <TableCell className="text-2xl mt-10 flex justify-center items-center">
              <Link href="/boardgames">
                <Button className="hover:bg-blue-600 hover:text-white bg-white text-primary/90 p-6">
                  Continue Shopping?
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="bg-secondary sm:w-full flex flex-col justify-center items-center sm:items-end">
        {basket?.items?.length > 0 && <BasketSummary basket={basket} />}
      </TableFooter>
    </>
  );
};

export default BasketDetails;
