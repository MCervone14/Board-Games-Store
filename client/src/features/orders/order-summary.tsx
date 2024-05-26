import { TableRow, TableCell } from "@/components/ui/table";

import { OrderItem } from "@/types/order";

interface OrderSummaryProps {
  orderItems: OrderItem[];
}

const OrderSummary = ({ orderItems }: OrderSummaryProps) => {
  const subtotal =
    orderItems?.reduce(
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
          <TableCell colSpan={4} className="bg-background"></TableCell>
          <TableCell className="font-bold border-b">{info.Label}</TableCell>
          <TableCell colSpan={2} className="pl-[88px] text-center border-b">
            ${info.Value?.toFixed(2) || 0}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default OrderSummary;
