import Image from "next/image";
import { notFound } from "next/navigation";
import { getBasket } from "@/actions/server";
import { BasketItem } from "@/types/basket";
import DetailsViewCartButton from "@/features/buttons/details-view-cart-button";
import { ProductPrice } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Metadata } from "next";

interface BoardGameDetailsPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Board Games | Tabletop_Zealots",
  description: "View board games and add them to your cart.",
};

const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/products/${id}`);
    return await response.json();
  } catch (error: any) {
    return { error };
  }
};

const ProductDetailsPage = async ({ params }: BoardGameDetailsPageProps) => {
  const product = await getProduct(params.id);
  const basket = await getBasket();

  const isInBasket = basket?.items?.find(
    (item: BasketItem) => item.productId === product?.id
  );

  if (product.error) {
    return notFound();
  }

  return (
    <div className="container flex flex-col py-10 bg-white">
      <div className="flex gap-6 lg:gap-12 ">
        <div className="items-center flex flex-col md:flex-row w-full">
          <div className="mx-auto">
            <Image
              alt={product.name}
              src={product.pictureUrl}
              width={500}
              height={500}
              className="object-contain"
              placeholder="blur"
              blurDataURL={product.pictureUrl}
            />
          </div>
          <div className="mx-auto flex flex-col space-y-6 w-full md:w-1/2">
            <h1 className="text-4xl text-center mt-5">{product.name}</h1>
            {product.isUsed && (
              <div className="">
                <div className="flex-col justify-center items-center w-full">
                  <Image
                    alt={"test Icon"}
                    src="/icons/open-box.png"
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                  <p className="text-red-800 text-bold text-md mb-2">
                    ATTENTION: Please note this is an open-box board game.
                  </p>
                  <p className="text-red-800 text-bold text-md">
                    CONDITION: {product.condition}
                  </p>
                </div>
              </div>
            )}
            <p className="w-full text-primary/80">{product.longDescription}</p>
            <div className="w-1/2 mx-auto">
              <div className="text-2xl text-center">
                {product?.salePrice ? (
                  <div className="font-bold">
                    <span className="line-through text-red-800 text-sm mr-2">
                      {ProductPrice(Number(product?.price))}
                    </span>{" "}
                    <span className="text-blue-600">
                      {ProductPrice(
                        Number(product?.price),
                        Number(product?.salePrice)
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-blue-600">
                    {ProductPrice(Number(product?.price))}
                  </div>
                )}
              </div>
              <div className="w-full max-w-[250px] mx-auto">
                <DetailsViewCartButton
                  quantityInStock={product.quantityInStock}
                  productId={params.id}
                  basket={basket}
                />
                <small>Quantity in Stock: {product.quantityInStock}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-lg mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Recommended Age:</TableCell>
              <TableCell>{product.playerAge}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Number of Players:</TableCell>
              <TableCell>{product.playerCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Playing Time:</TableCell>
              <TableCell>{product.playingTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Year Published:</TableCell>
              <TableCell>{product.year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Publisher(s):</TableCell>
              <TableCell>{product.publishers.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Designer(s):</TableCell>
              <TableCell>{product.designers.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Artists(s):</TableCell>
              <TableCell>{product.artists.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category(s):</TableCell>
              <TableCell>{product.categories.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mechanic(s):</TableCell>
              <TableCell>{product.mechanics.join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
