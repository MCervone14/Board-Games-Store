"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddProductFormSchema } from "@/lib/form-schemas";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropZone from "@/components/reusable/drop-zone";

interface AddProductFormProps {
  setEditMode?: (value: boolean) => void;
  product?: Product;
}

export function AddProductForm({ setEditMode, product }: AddProductFormProps) {
  const router = useRouter();
  const methods = useForm<z.infer<typeof AddProductFormSchema>>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 100,
      files: [],
      type: "",
      designer: "",
      publisher: "",
      quantityInStock: 1,
      // onSale: false,
      // salePrice: 0,
    },
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (product) {
      methods.reset(product);
    }
  }, [product, methods.reset]);

  const onSubmit = async (values: z.infer<typeof AddProductFormSchema>) => {};

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto"
      >
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of Product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description of Product</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Short description goes here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <DropZone onFilesChange={setUploadedFiles} name="files" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Category of Board Game"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="designer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designer(s)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Designer of Board Game"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher(s)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Publisher of Board Game"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="quantityInStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity of Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Quantity in Stock"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex gap-10 justify-center items-center">
          <Button type="submit">Submit Product</Button>
          <Button
            onClick={() => {
              if (setEditMode === undefined) {
                router.push("/inventory");
              } else {
                setEditMode(false);
              }
            }}
            variant="destructive"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
