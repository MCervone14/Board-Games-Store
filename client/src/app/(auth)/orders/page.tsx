import { Metadata } from "next";
import { orderColumns } from "@/features/table/data/orders-data/order-columns";

import { getOrders } from "@/actions/server";
import { DataTable } from "@/features/table/table";

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
      <DataTable data={orders} columns={orderColumns} />
    </div>
  );
}
