import { fetchProducts } from "@/actions/server";
import Catalog from "@/features/catalog/catalog";
import FilterSideBar from "@/features/filter/filter-sidebar";

const getFilters = async () => {
  const response = await fetch("http://localhost:5000/api/products/filters");

  return await response.json();
};

interface BoardGamesPageProps {
  searchParams: {
    orderBy: string;
    searchTerm: string;
    pageNumber: number;
    pageSize: number;
    types: string[];
  };
}

const BoardGamesPage = async ({ searchParams }: BoardGamesPageProps) => {
  const { products, paginationMetaData } = await fetchProducts(
    searchParams.orderBy || "name",
    searchParams.searchTerm || "",
    searchParams?.pageNumber || 1,
    searchParams?.pageSize || 12,
    searchParams.types || []
  );
  const filters = await getFilters();
  return (
    <div className="mt-10 flex justify-center gap-5">
      <div className="flex gap-5">
        <Catalog products={products} metaData={paginationMetaData} />
        <FilterSideBar filters={filters} />
      </div>
    </div>
  );
};

export default BoardGamesPage;
