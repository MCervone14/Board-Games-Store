import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import CartButton from "../buttons/cart-button";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/types/products";
import { ProductPrice } from "@/lib/utils";
import { getPlaiceholder } from "plaiceholder";

interface ProductCardProps {
  product: Product;
}

const ProductCard = async ({ product }: ProductCardProps) => {
  // const buffer = await fetch(product.pictureUrl).then(async (res) => {
  //   return Buffer.from(await res.arrayBuffer());
  // });
  // const { base64 } = await getPlaiceholder(buffer, { size: 10 });

  // if (!base64) {
  //   return null;
  // }

  return (
    <Card className="pt-2 space-y-4 border hover:border-black relative flex flex-col justify-between">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        {product.isUsed && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="absolute right-2 top-2 bg-blue-200 p-2 rounded-full">
                <Image
                  alt={"test Icon"}
                  src="/icons/open-box.png"
                  width={20}
                  height={20}
                  className=""
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{product.condition}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Link href={`/boardgames/${product.id}`} className="w-full">
          {product.pictureUrl && (
            <Image
              alt={product.name}
              className="mx-auto object-contain max-h-[300px] h-[300px]"
              src={product.pictureUrl}
              width={300}
              height={300}
            />
          )}
        </Link>
      </CardHeader>
      <CardContent>
        <small className="font-semibold text-lg md:text-xl text-blue-600">
          {product.salePrice ? (
            <>
              <span className="line-through text-red-500 mr-2 text-sm">
                {ProductPrice(product.price)}
              </span>
              <span className="text-md">
                {ProductPrice(product.price, product.salePrice)}
              </span>
            </>
          ) : (
            <span className="font-bold">
              ${(product.price / 100).toFixed(2)}
            </span>
          )}
        </small>
        <Link href={`/boardgames/${product.id}`} className="group">
          <h3 className="font-bold text-xl line-clamp-2 group-hover:opacity-80 mb-2">
            {product.name}
          </h3>
          <h4 className="text-sm text-wrap group-hover:opacity-80 line-clamp-7">
            {product.description}
          </h4>
        </Link>
      </CardContent>
      <CardFooter className="p-0 flex">
        <CartButton
          productId={product.id}
          quantity={1}
          method="POST"
          cookie={true}
          className="hover:bg-blue-600"
        >
          Add to Cart
        </CartButton>
        <Link href={`/boardgames/${product.id}`} className="w-1/4 h-full">
          <Button
            variant="link"
            className="rounded-l-none rounded-tr-none hover:bg-blue-600 py-3 hover:text-white w-full h-full border-t-1"
          >
            <InformationCircleIcon className="h-6 w-6" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
