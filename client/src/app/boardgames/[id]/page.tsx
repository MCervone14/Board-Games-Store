import Image from "next/image";
import { notFound } from "next/navigation";
import { getBasket } from "@/actions/server";
import { BasketItem } from "@/types/basket";
import { Label } from "@/components/ui/label";
import DetailsViewCartButton from "@/features/buttons/details-view-cart-button";
import { ProductPrice } from "@/lib/utils";
import RadarChartComponent from "@/features/charts/radar-chart-component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BoardGameDetailsPageProps {
  params: {
    id: string;
  };
}

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

  if (!basket) {
    return notFound();
  }

  const catData = product.categories.flatMap(
    (category: string, index: number) => {
      return {
        subject: category,
        A: parseInt(product.categoryWeights[index], 10),
        fullMark: 10,
      };
    }
  );

  const mecData = product.mechanics.flatMap(
    (category: string, index: number) => {
      return {
        subject: category,
        A: parseInt(product.mechanicWeights[index], 10),
        fullMark: 10,
      };
    }
  );

  return (
    <div className="container flex flex-col mt-10">
      <div className="flex gap-6 lg:gap-12">
        <div className="flex items-center flex-wrap">
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
          <div className="mx-auto flex flex-col w-1/2 space-y-6">
            <h1 className="text-4xl text-center">{product.name}</h1>
            {product.isUsed && (
              <div className="">
                <div className="flex justify-center items-center w-full">
                  <Image
                    alt={"test Icon"}
                    src="/icons/open-box.png"
                    width={50}
                    height={50}
                    className="mr-4"
                  />
                  <p className="text-red-500 text-bold text-md">
                    ATTENTION: Please note this is an open-box board game.
                    <br />
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
                    <span className="line-through text-red-500 text-sm mr-2">
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
              <div>
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
      <div className="border rounded-lg mb-10">
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
              <TableCell>Year Published</TableCell>
              <TableCell>{product.year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Publisher(s)</TableCell>
              <TableCell>{product.publishers.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Designer(s)</TableCell>
              <TableCell>{product.designers.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Artists(s)</TableCell>
              <TableCell>{product.artists.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category(s)</TableCell>
              <TableCell>{product.categories.join(", ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mechanic(s)</TableCell>
              <TableCell>{product.mechanics.join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex flex-wrap justify-center">
          <div className="text-center mt-10">
            <Label className="text-2xl">Categories</Label>
            <RadarChartComponent data={catData} />
          </div>
          <div className="text-center mt-10">
            <Label className="text-2xl">Mechanics</Label>
            <RadarChartComponent data={mecData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
