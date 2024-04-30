import { Skeleton } from "@/components/ui/skeleton";

const ProductLoadingPage = () => {
  return (
    <div className="flex h-screen max-w-7xl mx-auto gap-5 justify-center items-center">
      <div className="max-w-7xl relative w-[500px] h-[500px]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton className="h-5 mt-2 w-full" />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center w-[200px]">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};

export default ProductLoadingPage;
