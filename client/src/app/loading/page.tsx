import { Skeleton } from "@/components/ui/skeleton";

const OrdersLoadingPage = () => {
  return (
    <div className="flex items-center flex-col space-y-8 p-8 max-w-7xl mx-auto h-screen">
      <div className="flex items-center justify-between">
        <div>
          <p>
            <Skeleton className="w-48 h-8 mb-2" />
          </p>
          <p>
            <Skeleton className="w-48 h-4" />
          </p>
        </div>
      </div>
      <Skeleton className="w-3/4 h-screen" />
    </div>
  );
};

export default OrdersLoadingPage;
