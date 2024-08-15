import { AddProductForm } from "@/features/form/add-product-form";
import { Metadata } from "next";
import React from "react";

const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching product:", error.message);
  }
};

interface InventoryDetailsPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Inventory | Tabletop_Zealots",
  description: "View current inventory of products.",
};

const InventoryDetailsPage = async ({ params }: InventoryDetailsPageProps) => {
  const product = await getProduct(params.id);

  if (!product) {
    return null;
  }

  return (
    <div>
      <AddProductForm product={product} />
    </div>
  );
};

export default InventoryDetailsPage;
