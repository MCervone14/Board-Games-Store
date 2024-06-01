import { Product } from "@/types/products";
import ProductList from "./product-list";
import NextPagePagination from "../pagination/nextpage-pagination";
import { MetaData } from "@/types/metaData";

interface CatalogProps {
  products: Product[];
  metaData: MetaData;
}

const Catalog = async ({ products, metaData }: CatalogProps) => {
  return (
    <>
      <ProductList products={products} />
      <NextPagePagination metaData={metaData} />
    </>
  );
};

export default Catalog;
