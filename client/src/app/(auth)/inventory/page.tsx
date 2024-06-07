import Inventory from "@/features/inventory/Inventory";

const getProducts = async () => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/products?pageSize=${1000}`
  );
  const data = await response.json();
  return data;
};

const InventoryPage = async () => {
  const { products } = await getProducts();
  return <Inventory products={products} />;
};

export default InventoryPage;
