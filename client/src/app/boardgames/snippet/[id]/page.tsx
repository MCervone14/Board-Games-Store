"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CartButton from "@/features/buttons/cart-button";
import { ProductPrice } from "@/lib/utils";
import { Product } from "@/types/products";

import { useRouter, usePathname, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardDetailsPageModalProps {
  params: {
    id: string;
  };
}

const BoardDetailsPageModal = ({ params }: BoardDetailsPageModalProps) => {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getProduct = async (idParam: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://tabletopzealots.azurewebsites.net/api/products/${idParam}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getProduct(params.id);
  }, [params.id]);

  return (
    <Dialog
      open={pathname === `/boardgames/snippet/${params.id}`}
      onOpenChange={() => router.back()}
    >
      <DialogContent className="sm:max-w-[375px] md:max-w-[800px] ">
        {!isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={product?.pictureUrl || ""}
                alt="Product Image"
                width={600}
                height={600}
                className="w-full rounded-lg object-contain aspect-square"
              />
              {product?.isUsed && (
                <div className="flex">
                  <Image
                    src="/icons/open-box.png"
                    alt="Used"
                    width={40}
                    height={10}
                    className="w-fit mr-2 aspect-square"
                  />
                  <div className="flex flex-col text-xs text-bold text-red-500">
                    <p>*Please be aware this is an open-box product*</p>
                    <p>Condition: {product?.condition}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="grid gap-6">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-center">
                  {product?.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {product?.description}
                </p>
              </div>
              <Card>
                <CardContent className="grid gap-4 ">
                  <div className="space-y-2 w-full">
                    <h3 className="text-xl font-medium text-center">
                      Product Information
                    </h3>
                    <div className="grid grid-cols-2 ">
                      <p className="font-bold">Player Ages:</p>
                      <p className="">{product?.playerAge}</p>
                      <p className="font-bold">Player Count:</p>
                      <p className="">{product?.playerCount}</p>
                      <p className="font-bold">Play Time:</p>
                      <p className="">{product?.playingTime}</p>
                      <p className="font-bold">Year:</p>
                      <p className="">{product?.year}</p>
                      <p className="font-bold">Complexity:</p>
                      <p className="">{product?.complexity}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex  items-center">
                      {product?.salePrice ? (
                        <div className="font-bold flex flex-col text-sm">
                          <span className="line-through text-red-500 text-sm">
                            {ProductPrice(Number(product?.price))}
                          </span>
                          {ProductPrice(
                            Number(product?.price),
                            Number(product?.salePrice)
                          )}
                        </div>
                      ) : (
                        <div className="text-2xl font-bold">
                          {ProductPrice(Number(product?.price))}
                        </div>
                      )}
                    </div>
                    <Button className="my-auto">See More Details</Button>
                  </div>
                  <CartButton
                    productId={Number(product?.id)}
                    quantity={1}
                    method="POST"
                    cookie={true}
                    className="hover:bg-blue-600"
                  >
                    Add to Cart
                  </CartButton>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex justify-around sm:max-w-[375px] md:max-w-[800px] h-[500px]">
            <div className="w-full flex justify-center items-center">
              <Skeleton className="w-1/2 bg-gray-200 h-[300px]" />
            </div>
            <div className="w-full mt-10">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-center">
                  <Skeleton className="w-full bg-gray-200 h-10" />
                </h2>
                <p className="text-gray-500 ">
                  <Skeleton className="w-full bg-gray-200 h-24" />
                </p>
              </div>
              <Card className="mt-10">
                <CardContent className="grid gap-4 ">
                  <div className="space-y-2 w-full">
                    <h3 className="text-xl font-medium text-center">
                      Product Information
                    </h3>
                    <p className="space-y-6">
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-48 h-4" />
                      <Skeleton className="w-48 h-4" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BoardDetailsPageModal;
