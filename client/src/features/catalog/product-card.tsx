"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddProductButton from "../cart-button/add-product-button";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    pictureUrl: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="py-4 space-y-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt={product.name}
          className="mx-auto object-contain max-h-[300px] h-[300px] w-full"
          src={product.pictureUrl}
          width={200}
          height={200}
        />
      </CardHeader>
      <CardContent className="overflow-visible py-2">
        <small className="text-tiny uppercase font-bold line-clamp-1">
          {product.name}
        </small>
        <small className="text-default-500">
          ${(product.price / 100).toFixed(2)}
        </small>
        <h4 className="text-sm text-wrap">{product.description}</h4>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 items-center">
        <AddProductButton productId={product.id} quantity={1} />
        <Button variant="link">
          <Link href={`/boardgames/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
