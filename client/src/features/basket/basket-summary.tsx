import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { BasketItem } from "@/types/basket";
import Link from "next/link";

interface BasketSummaryProps {
  basket: {
    buyerId: string;
    items: BasketItem[];
    status?: number;
  };
}

const BasketSummary = ({ basket }: BasketSummaryProps) => {
  const subtotal =
    basket?.items?.reduce(
      (acc, item) => acc + (item.price * item.quantity) / 100,
      0
    ) || 0;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 5;
  const total = subtotal + shipping;

  const tableInfo = [
    {
      id: "001",
      Label: "Subtotal",
      Value: subtotal,
    },
    {
      id: "002",
      Label: "Shipping",
      Value: shipping,
    },
    {
      id: "003",
      Label: "Total",
      Value: total,
    },
  ];

  return (
    <>
      {tableInfo.map((info) => (
        <TableRow className="" key={info.id}>
          <TableCell colSpan={4}></TableCell>
          <TableCell className="font-bold border-b">{info.Label}</TableCell>
          <TableCell colSpan={2} className="pl-[88px] text-center border-b">
            ${info.Value?.toFixed(2) || 0}
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell colSpan={4}></TableCell>
        <TableCell colSpan={3} className="italic text-sm text-center border-b">
          *Orders over $100 qualify for free shipping!
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}></TableCell>
        <TableCell colSpan={3} className="text-center p-10">
          <Link href="/checkout">
            <Button className="w-full">Checkout</Button>
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BasketSummary;
