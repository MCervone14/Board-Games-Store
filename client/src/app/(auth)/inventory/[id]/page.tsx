import { AddProductForm } from "@/features/form/add-product-form";
import React from "react";

const getProduct = async (id: string) => {
  const response = await fetch(`${process.env.BASE_API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};

interface InventoryDetailsPageProps {
  params: {
    id: string;
  };
}

const InventoryDetailsPage = async ({ params }: InventoryDetailsPageProps) => {
  const product = await getProduct(params.id);

  return (
    <div>
      <AddProductForm product={product} />
    </div>
  );
};

export default InventoryDetailsPage;
