import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsLoadingPage = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-5 mt-10">
      {Array.from({ length: 9 }).map((_, index) => (
        <Card className="py-4 space-y-4" key={index}>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <Skeleton className="mx-auto object-contain max-h-[300px] h-[300px] w-full" />
          </CardHeader>
          <CardContent className="overflow-visible py-2">
            <small className="text-tiny uppercase font-bold line-clamp-1">
              <Skeleton className="w-24 h-4" />
            </small>
            <small className="text-default-500">
              <Skeleton className="w-24 h-4 mt-2" />
            </small>
            <h4 className="text-sm text-wrap">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="w-full h-4 mt-2" key={index} />
              ))}
            </h4>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 items-center">
            <Button variant="link">
              <Skeleton className="w-24 h-4" />
            </Button>
            <Button variant="link">
              <Skeleton className="w-24 h-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductsLoadingPage;
