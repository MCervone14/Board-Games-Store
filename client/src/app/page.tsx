import Catalog from "@/features/catalog/catalog";

const getProducts = async () => {
  const response = await fetch("http://localhost:5000/api/products");
  return await response.json();
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mt-10">
      <Catalog products={products} />
    </main>
  );
}
