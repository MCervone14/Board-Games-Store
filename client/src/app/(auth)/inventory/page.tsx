import Inventory from "@/features/inventory/Inventory";
import { notFound } from "next/navigation";

const getProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/products?pageSize=${1000}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error };
  }
};

const InventoryPage = async () => {
  const { products } = await getProducts();

  if (!products) {
    return notFound();
  }

  return <Inventory products={products} />;
};

export default InventoryPage;
