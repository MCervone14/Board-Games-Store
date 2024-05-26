import { Metadata } from "next";
import { z } from "zod";
import { columns } from "@/features/orders/columns";
import { OrderTable } from "@/features/orders/order-table";
import { getOrders } from "@/actions/server";

export const metadata: Metadata = {
  title: "Orders",
  description: "Track your orders and their status.",
};

export default async function TaskPage() {
  const orders = await getOrders();

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Orders</h2>
          <p className="text-muted-foreground">
            List of recent order transactions.
          </p>
        </div>
      </div>
      <OrderTable data={orders} columns={columns} />
    </div>
  );
}
