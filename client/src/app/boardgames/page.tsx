import { fetchProducts } from "@/actions/server";
import Catalog from "@/features/catalog/catalog";
import FilterSideBar from "@/features/filter/filter-sidebar";

const getFilters = async () => {
  const response = await fetch(`${process.env.BASE_API_URL}/products/filters`);

  return await response.json();
};

interface BoardGamesPageProps {
  searchParams: {
    orderBy: string;
    searchTerm: string;
    categoriesSelected: string;
    mechanicsSelected: string;
    pageNumber: number;
    pageSize: number;
  };
}

const BoardGamesPage = async ({ searchParams }: BoardGamesPageProps) => {
  const { products, paginationMetaData } = await fetchProducts(
    searchParams.orderBy || "name",
    searchParams.searchTerm || "",
    searchParams?.pageNumber || 1,
    searchParams?.pageSize || 12,
    searchParams?.categoriesSelected || "",
    searchParams?.mechanicsSelected || ""
  );
  const filters = await getFilters();
  return (
    <div className="container">
      <FilterSideBar filters={filters} />
      <Catalog products={products} metaData={paginationMetaData} />
    </div>
  );
};

export default BoardGamesPage;
