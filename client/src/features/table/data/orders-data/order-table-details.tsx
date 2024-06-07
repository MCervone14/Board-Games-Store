import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Order } from "@/types/order";
import Summary from "../../table-summary";

interface DetailsProps {
  order: Order;
}

const OrderTableDetails = ({ order }: DetailsProps) => {
  return (
    <Table className="max-w-7xl mx-auto">
      <TableCaption>
        Order # {order.id} - {order.orderStatus}
      </TableCaption>
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
        {order?.orderItems?.map((item) => (
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
                {item.quantity}
              </div>
            </TableCell>
            <TableCell className="w-[150px]">
              <div className="flex items-center justify-end">
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="mx-auto">
        <Summary items={order.orderItems} />
      </TableFooter>
    </Table>
  );
};

export default OrderTableDetails;
