import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BoardGameDetailsPageProps {
  params: {
    id: string;
  };
}

const getProduct = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    return await response.json();
  } catch (error: any) {
    return { error };
  }
};

const BoardGameDetailsPage = async ({ params }: BoardGameDetailsPageProps) => {
  const product = await getProduct(params.id);

  if (product.error) {
    return notFound();
  }

  return (
    <div className="flex h-screen max-w-7xl mx-auto justify-center items-center">
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
      <div className="flex flex-col items-center justify-center w-[200px]">
        <h4 className="text-4xl flex justify-center">
          ${(product.price / 100).toFixed(2)}
        </h4>
        <Button className="mt-2">Add to Cart</Button>
      </div>
    </div>
  );
};

export default BoardGameDetailsPage;
