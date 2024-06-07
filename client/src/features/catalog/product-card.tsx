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
    <Card className="pt-2 space-y-4 border hover:border-black relative">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
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
              <p>
                Condition: Minor Wear to the outer box. No Missing Pieces.
                Components in Excellent condition.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link href={`/boardgames/${product.id}`} className="w-full">
          {product.pictureUrl && (
            <Image
              alt={product.name}
              className="mx-auto object-contain max-h-[300px] h-[300px] w-full"
              src={product.pictureUrl}
              width={300}
              height={300}
            />
          )}
        </Link>
      </CardHeader>
      <CardContent className="py-2">
        <small className="font-semibold text-lg md:text-xl text-blue-600">
          ${(product.price / 100).toFixed(2)}
        </small>
        <Link href={`/boardgames/${product.id}`} className="group">
          <h3 className="font-bold text-xl line-clamp-1 group-hover:opacity-80">
            {product.name}
          </h3>
          <h4 className="text-sm text-wrap group-hover:opacity-80 line-clamp-2">
            {product.description}
          </h4>
        </Link>
      </CardContent>
      <CardFooter className="p-0 flex items-end">
        <CartButton
          productId={product.id}
          quantity={1}
          method="POST"
          cookie={true}
        >
          Add to Cart
        </CartButton>
        <Link href={`/boardgames/${product.id}`} className="w-1/4 h-full">
          <Button
            variant="link"
            className="rounded-l-none rounded-tr-none hover:bg-primary/90 py-3 hover:text-white w-full h-full border-t-1"
          >
            <InformationCircleIcon className="h-6 w-6" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
