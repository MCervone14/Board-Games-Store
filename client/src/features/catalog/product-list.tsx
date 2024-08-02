import { Product } from "@/types/products";
import ProductCard from "./product-card";

interface ProductCardProps {
  products: Product[];
}

const ProductList = ({ products }: ProductCardProps) => {
  if (products.length === 0)
    return (
      <div className="flex justify-center items-center text-3xl mt-10 min-h-[50vh]">
        No products were found. Try a different search.
      </div>
    );
  return (
    <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
