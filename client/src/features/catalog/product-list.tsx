import { Product } from "@/types/products";
import ProductCard from "./product-card";

interface ProductCardProps {
  products: Product[];
}

const ProductList = ({ products }: ProductCardProps) => {
  return (
    <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
