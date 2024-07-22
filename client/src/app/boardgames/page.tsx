import { fetchProducts } from "@/actions/server";
import Catalog from "@/features/catalog/catalog";
import FilterSideBar from "@/features/filter/filter-sidebar";
import { notFound } from "next/navigation";

const getFilters = async () => {
  // const response = await fetch(`${process.env.BASE_API_URL}/products/filters`);

  // return await response.json();
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/products/filters`
    );

    // Check if response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Ensure the response content type is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response format: ${text}`);
    }
  } catch (error: any) {
    console.error("Error fetching filters:", error.message);
    throw error; // Re-throw the error to handle it further up if needed
  }
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
  if (!products) {
    return notFound();
  }

  const filters = await getFilters();

  if (!filters) {
    return notFound();
  }

  return (
    <div className="container">
      <FilterSideBar filters={filters} />
      <Catalog products={products} metaData={paginationMetaData} />
    </div>
  );
};

export default BoardGamesPage;
