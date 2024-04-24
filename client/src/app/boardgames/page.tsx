import Catalog from "@/features/catalog/catalog";

const getProducts = async () => {
  const response = await fetch("http://localhost:5000/api/products");
  return await response.json();
};

const BoardGamesPage = async () => {
  const products = await getProducts();
  return (
    <div className="mt-10">
      <Catalog products={products} />
    </div>
  );
};

export default BoardGamesPage;
