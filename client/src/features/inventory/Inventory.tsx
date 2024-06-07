"use client";

import { Button } from "@/components/ui/button";
import { adminColumns } from "@/features/table/data/admin-data/admin-columns";
import { DataTable } from "@/features/table/table";
import { useState } from "react";
import { AddProductForm } from "../form/add-product-form";
import { Product } from "@/types/products";

interface InventoryProps {
  products: Product[];
}

const Inventory = ({ products }: InventoryProps) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const cancelEdit = () => {
    if (selectedProduct) {
      setSelectedProduct(undefined);
    }
    setEditMode(false);
  };

  if (editMode) {
    return (
      <AddProductForm setEditMode={setEditMode} product={selectedProduct} />
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
          <Button onClick={() => setEditMode(true)} className="bg-blue-600">
            Add Product
          </Button>
        </div>
      </div>
      <DataTable data={products} columns={adminColumns} />
    </div>
  );
};

export default Inventory;
