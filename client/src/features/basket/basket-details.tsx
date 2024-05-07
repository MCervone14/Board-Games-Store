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
import { BasketItem } from "@/types/basket";
import Image from "next/image";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import CartButton from "../cart/cart-button";
import BasketSummary from "./basket-summary";

interface BasketProps {
  basket: {
    buyerId: number;
    items: BasketItem[];
    status?: number;
    subtotal: number;
  };
}

const BasketDetails = async ({ basket }: BasketProps) => {
  if (basket.status === 404) {
    return <h3>Your basket is empty</h3>;
  }

  return (
    <Table className="max-w-7xl mx-auto">
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
      <TableBody>
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
                >
                  <MinusCircleIcon className="w-5 text-gray-200 hover:text-gray-100" />
                </CartButton>
                {item.quantity}
                <CartButton
                  productId={item.productId}
                  quantity={1}
                  method="POST"
                  cookie={true}
                >
                  <PlusCircleIcon className="w-5 text-gray-200 hover:text-gray-100 rounded-full" />
                </CartButton>
              </div>
            </TableCell>
            <TableCell className="w-[150px]">
              <div className="flex items-center justify-end">
                ${((item.price * item.quantity) / 100).toFixed(2)}
                <CartButton
                  productId={item.productId}
                  quantity={item.quantity}
                  method="DELETE"
                  cookie={false}
                >
                  <XMarkIcon className="bg-slate-200 w-4 h-4 rounded-full text-slate-700 hover:cursor-pointer hover:bg-slate-100" />
                </CartButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="mx-auto">
        <BasketSummary basket={basket} />
      </TableFooter>
    </Table>
  );
};

export default BasketDetails;
