"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../data-table-column-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Product } from "@/types/products";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DeleteProduct } from "@/actions/server";

export const adminColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>${((row.getValue("price") as number) / 100).toFixed(2)}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "quantityInStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity in Stock" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center px-10">
          <span>{row.getValue("quantityInStock")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              router.push(`/inventory/${row.getValue("id")}`);
            }}
          >
            <PencilIcon className="h-5 w-5 fill-blue-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              DeleteProduct(row.getValue("id"));
            }}
          >
            <TrashIcon className="h-5 w-5 fill-red-600" />
          </Button>
        </div>
      );
    },
  },
];
