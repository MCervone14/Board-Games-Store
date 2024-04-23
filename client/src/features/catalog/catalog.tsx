import { Button } from "@/components/ui/button";
import { Product } from "@/types/products";
import ProductList from "./product-list";

interface CatalogProps {
  products: Product[];
}

const Catalog = ({ products }: CatalogProps) => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <ProductList products={products} />
      <Button className="mt-4" color="primary">
        Add Product
      </Button>
    </div>
  );
};

export default Catalog;
