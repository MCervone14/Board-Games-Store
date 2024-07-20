import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
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

interface BasketDetailsProps {
  basket: Basket;
}

const BasketDetails = async ({ basket }: BasketDetailsProps) => {
  return (
    <Table className="max-w-5xl mx-auto min-h-screen">
      <TableCaption>Product(s) in your Cart</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="" colSpan={3}>
            Product Name
          </TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Subtotal</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-gray-100">
        {basket?.items?.map((item) => (
          <TableRow key={item.productId}>
            <TableCell>
              <Image
                src={item.pictureUrl}
                width={84}
                height={84}
                alt={item.name}
                className="min-w-[84px] min-h-[84px] max-w-[84px] max-h-[84px]"
              />
            </TableCell>
            <TableCell className="font-medium w-full" colSpan={3}>
              {item.name}
            </TableCell>
            <TableCell className="w-[100px]">
              ${(item.price / 100).toFixed(2)}
            </TableCell>
            <TableCell className="text-center w-[100px]">
              <div className="flex items-center justify-center">
                <CartButton
                  productId={item.productId}
                  quantity={1}
                  method="DELETE"
                  cookie={false}
                  variant="ghost"
                >
                  <MinusCircleIcon className="w-7 h-7 text-primary/90 hover:text-primary hover:fill-blue-600" />
                </CartButton>
                {item.quantityInStock}
                <CartButton
                  productId={item.productId}
                  quantity={1}
                  method="POST"
                  cookie={true}
                  variant="ghost"
                >
                  <PlusCircleIcon className="w-7 h-7 text-primary/90 hover:text-primary hover:fill-blue-600" />
                </CartButton>
              </div>
            </TableCell>
            <TableCell className="w-[150px]">
              <div className="flex items-center justify-end">
                ${((item.price * item.quantityInStock) / 100).toFixed(2)}
                <CartButton
                  productId={item.productId}
                  quantity={item.quantityInStock}
                  method="DELETE"
                  cookie={false}
                  variant="ghost"
                >
                  <XMarkIcon className="w-5 h-5 rounded-full  hover:text-red-600 hover:bg-red-100" />
                </CartButton>
              </div>
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
      {basket?.items?.length > 0 && (
        <TableFooter className="mx-auto bg-gray-100">
          <BasketSummary basket={basket} />
        </TableFooter>
      )}
    </Table>
  );
};

export default BasketDetails;
