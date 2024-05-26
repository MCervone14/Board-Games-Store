import BackButton from "@/features/buttons/back-button";
import OrderDetails from "@/features/orders/order-details";
import { cookies } from "next/headers";

const getOrder = async (id: string) => {
  const nextCookies = cookies();
  const buyerId = nextCookies.get("buyerId")?.value;
  const token = nextCookies.get("token")?.value;

  const response = await fetch(`http://localhost:5000/api/Orders/${id}`, {
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

const OrdersDetailPage = async ({ params }: OrdersDetailPageProps) => {
  const order = await getOrder(params.id);

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="text-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order Details</h2>
          <p className="text-muted-foreground">
            Order information for order # {order.id}
          </p>
        </div>
        <div className="mt-2">
          <BackButton>Back to Orders</BackButton>
        </div>
      </div>
      <OrderDetails order={order} />
    </div>
  );
};

export default OrdersDetailPage;