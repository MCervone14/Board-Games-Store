"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/products";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface BoardDetailsPageModalProps {
  params: {
    id: string;
  };
}

const BoardDetailsPageModal = ({ params }: BoardDetailsPageModalProps) => {
  const [product, setProduct] = useState<Product>();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getProduct = async (id: string) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error: any) {
        console.error(error);
      }
    };

    getProduct(params.id);
  }, [params.id]);
  console.log(product);

  return (
    <Dialog
      open={pathname === `/boardgames/${params.id}`}
      onOpenChange={() => router.back()}
    >
      <DialogContent className="sm:max-w-[800px]">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <img
              src={product?.pictureUrl}
              alt="Product Image"
              width={600}
              height={600}
              className="w-full rounded-lg object-cover aspect-square"
            />
          </div>
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold">{product?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {product?.description}
              </p>
            </div>
            <Card>
              <CardContent className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium">Product Details</h3>
                  <p className="text-gray-500">Players: 1-4</p>
                  <p className="text-gray-500">{product?.designer}</p>
                  <p>{product?.publisher}</p>
                  <p>{product?.type}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Select quantity"
                          id="quantity"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <div className="text-2xl font-bold">
                      ${(Number(product?.price) / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
                <Button size="lg" className="bg-blue-600">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoardDetailsPageModal;
