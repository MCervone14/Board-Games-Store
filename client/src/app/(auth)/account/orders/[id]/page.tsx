import BackButton from "@/features/buttons/back-button";
import OrderTableDetails from "@/features/table/data/orders-data/order-table-details";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const getOrder = async (id: string) => {
  const nextCookies = cookies();
  const buyerId = nextCookies.get("buyerId")?.value;
  const token = nextCookies.get("token")?.value;

  const response = await fetch(`${process.env.BASE_API_URL}/Orders/${id}`, {
    method: "GET",
    headers: {
      contentType: "application/json",
      Cookie: `buyerId=${buyerId}`,
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  return data;
};

interface OrdersDetailPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Orders | Tabletop_Zealots",
  description: "View your recent orders and change your profile settings.",
};

const OrdersDetailPage = async ({ params }: OrdersDetailPageProps) => {
  const order = await getOrder(params.id);

  if (!order) {
    return notFound();
  }

  return (
    <div className="flex flex-col space-y-8 p-8 h-screen">
      <div className="text-center">
        <div className="">
          <h2 className="text-2xl font-bold tracking-tight">Order Details</h2>
          <p className="">Order information for order # {order.id}</p>
        </div>
        <div className="mt-2">
          <BackButton>Back to Orders</BackButton>
        </div>
      </div>
      <OrderTableDetails order={order} />
    </div>
  );
};

export default OrdersDetailPage;
