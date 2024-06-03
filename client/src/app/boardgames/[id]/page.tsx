import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBasket } from "@/actions/server";
import { BasketItem } from "@/types/basket";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import DetailsViewCartButton from "@/features/buttons/details-view-cart-button";

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

  return (
    <div className="flex h-screen max-w-7xl mx-auto justify-center items-center gap-10">
      <div className="max-w-7xl relative w-[500px] h-[500px]">
        <Image alt={product.name} src={product.pictureUrl} fill />
      </div>
      <div className="flex-1">
        <h1 className="text-4xl flex justify-center">{product.name}</h1>
        <hr className="mt-2" />
        <p>Player: 1-4</p>
        <hr className="mt-2" />
        <p>Playtime: 30-60 minutes</p>
        <hr className="mt-2" />
        <p>Age: 14+</p>
        <hr className="mt-2" />
        <p>Designer: {product.designer}</p>
        <hr className="mt-2" />
        <p>Publisher: {product.publisher}</p>
        <hr className="mt-2" />
        <p>Type: {product.type}</p>
        <hr className="mt-2" />
        <p>Year: {product.year}</p>
        <hr className="mt-2" />
        <p>Category: {product.category}</p>
        <hr className="mt-2" />
        <p>Mechanics: {product.mechanics}</p>
        <hr className="mt-2" />
        <p>BGG Rating: {product.rating}</p>
        <hr className="mt-2" />
        <p>{product.description}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-[300px] gap-2">
        <h4 className="text-4xl flex justify-center">
          ${(product.price / 100).toFixed(2)}
        </h4>
        <DetailsViewCartButton
          quantityInStock={product.quantityInStock}
          productId={params.id}
          basket={basket}
        />
        <small>Quantity in Stock: {product.quantityInStock}</small>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
