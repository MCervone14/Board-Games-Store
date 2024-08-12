import { Product } from "@/types/products";
import ProductList from "./product-list";
import NextPagePagination from "../pagination/nextpage-pagination";
import { MetaData } from "@/types/metaData";

interface CatalogProps {
  products: Product[];
  metaData: MetaData;
  hidden?: boolean;
}

const Catalog = ({ products, metaData, hidden }: CatalogProps) => {
  return (
    <>
      <ProductList products={products} />
      <NextPagePagination metaData={metaData} hidden={hidden} />
    </>
  );
};

export default Catalog;
