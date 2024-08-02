import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Basket } from "@/types/basket";
import Image from "next/image";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import CartButton from "../buttons/cart-button";
import BasketSummary from "./basket-summary";
import { ProductPrice } from "@/lib/utils";

interface BasketDetailsProps {
  basket: Basket;
}

const BasketDetails = async ({ basket }: BasketDetailsProps) => {
  return (
    <Table className="container mx-auto w-[375px] sm:w-full flex flex-col py-10">
      <TableBody>
        {basket?.items?.map((item) => (
          <TableRow
            key={item.productId}
            className="flex flex-col sm:flex-row relative"
          >
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
              Price: {ProductPrice(Number(item?.price))}
            </TableCell>
            <TableCell className="text-center m-auto">
              <div className="min-w-[200px] flex items-center justify-center">
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
              </div>
            </TableCell>
            <TableCell className="font-bold m-auto w-[200px]">
              Subtotal: $
              {((item.price * item.quantityInStock) / 100).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
        {basket?.items?.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Your cart is empty
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="bg-gray-100 m-auto sm:w-full flex flex-col justify-center items-end ">
        {basket?.items?.length > 0 && <BasketSummary basket={basket} />}
      </TableFooter>
    </Table>
  );
};

export default BasketDetails;
