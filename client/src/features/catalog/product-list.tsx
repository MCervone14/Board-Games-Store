import { Product } from "@/types/products";
import ProductCard from "./product-card";

interface ProductCardProps {
  products: Product[];
}

const ProductList = ({ products }: ProductCardProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 max-w-6xl gap-4 w-full  justify-center items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
