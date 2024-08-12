import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HomePageLoading = () => {
  return (
    <>
      <section className="w-full">
        <Skeleton className="w-full h-[680px] bg-gray-200" />
      </section>
      <section className="w-full">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 py-6 border shadow-lg">
          <div className=" flex flex-col items-center justify-center space-y-4 text-2xl">
            <p>
              We sell <span className="text-blue-600">NEW </span> and{" "}
              <span className="text-blue-600">USED</span> board games!
            </p>
            <p>Look for the open-box icon in the top-right corner.</p>
          </div>
          <Skeleton className="w-16 h-16" />
          <Skeleton className="w-16 h-16" />
        </div>
      </section>
      <section className="w-full py-8 md:py-16 lg:py-24">
        <div className="container space-y-8 px-4 md:px-6">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Featured Products
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out the featured list of board games.
              </p>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            {Array.from({ length: 6 }).map((_, index) => (
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
        </div>
      </section>
    </>
  );
};

export default HomePageLoading;
