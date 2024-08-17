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
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DropZone from "@/components/reusable/drop-zone";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectComponent } from "@/components/reusable/select-combo-box";
import { CreateProduct, UpdateProduct, getFilters } from "@/actions/server";
import { createFormData } from "@/lib/utils";
import { toast } from "sonner";

interface AddProductFormProps {
  setEditMode?: (value: boolean) => void;
  product?: Product;
}

export function AddProductForm({ setEditMode, product }: AddProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<string[]>([]);
  const [mechanics, setMechanics] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const router = useRouter();
  const methods = useForm<z.infer<typeof AddProductFormSchema>>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      longDescription: "",
      year: "",
      playerAge: "",
      playerCount: "",
      playingTime: "",
      complexity: "",
      isUsed: false,
      price: 0,
      files: [],
      categories: [],
      categoryWeights: [],
      mechanics: [],
      mechanicWeights: [],
      designers: [],
      publishers: [],
      artists: [],
      quantityInStock: 1,
      salePrice: 0,
      hasFreeShipping: false,
      condition: "",
      pictureUrl: "",
      isFeatured: false,
    },
  });

  useEffect(() => {
    if (product) {
      const transformedProduct = {
        ...product,
        categories: product.categories?.map((category) => ({
          label: category,
          value: category,
        })),
        mechanics: product.mechanics?.map((mechanic) => ({
          label: mechanic,
          value: mechanic,
        })),
        artists: product.artists?.map((artist) => ({
          label: artist,
          value: artist,
        })),
        publishers: product.publishers?.map((publisher) => ({
          label: publisher,
          value: publisher,
        })),
        designers: product.designers?.map((designer) => ({
          label: designer,
          value: designer,
        })),
        categoryWeights: product.categoryWeights?.map((categoryWeight) => ({
          label: categoryWeight,
          value: categoryWeight,
        })),
        mechanicWeights: product.mechanicWeights?.map((mechanicWeight) => ({
          label: mechanicWeight,
          value: mechanicWeight,
        })),
      };
      //@ts-ignore
      methods.reset(transformedProduct);
    }
  }, [product, methods.reset]);

  useEffect(() => {
    const getFilterOptions = async () => {
      const filters = await getFilters();
      setCategories(filters.categories);
      setMechanics(filters.mechanics);
    };
    getFilterOptions();
  }, []);

  const FormatFilters = (filters: string[]) => {
    return filters.map((filter) => ({
      value: filter,
      label: filter,
    }));
  };

  const onSubmit = async (values: z.infer<typeof AddProductFormSchema>) => {
    const formData = createFormData(values);

    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("id", String(product?.id));

    try {
      if (product) {
        await UpdateProduct(formData);
        toast("Product Updated Successfully");
      } else {
        await CreateProduct(formData);
        toast("Product Created Successfully");
      }
      router.replace("/inventory");
    } catch (error) {
      console.error(error);
      toast("An error occurred, when creating the product");
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="max-w-6xl my-10 mx-auto p-6 sm:p-8 md:p-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">New Product Form</CardTitle>
          <CardDescription>
            Fill out the details below to create a new product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              startTransition(() => {
                methods.handleSubmit(onSubmit)();
              });
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="grid gap-4">
              <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        {...field}
                        value={field.value}
                        type="text"
                        placeholder="Product Name"
                      />
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
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value}
                        id="description"
                        placeholder="Short product description"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={methods.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          id="price"
                          type="number"
                          placeholder="9999 e.g $99.99"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="sale-price">Sale Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          id="sale-price"
                          type="number"
                          placeholder="7999 e.g. $79.99"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={methods.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <DropZone
                      onFilesChange={(files) => {
                        field.onChange(files);
                        setUploadedFiles(files);
                      }}
                      {...field}
                      name="files"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={methods.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="categories"
                        className="text-sm font-medium"
                      >
                        Categories
                      </Label>
                      <FormControl>
                        <SelectComponent
                          createAble={false}
                          isMulti={true}
                          options={FormatFilters(categories)}
                          placeholder="Select Categories"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={methods.control}
                  name="categoryWeights"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="categoryWeights"
                        className="text-sm font-medium"
                      >
                        Category Weights (0-10)
                      </Label>
                      <FormControl>
                        <SelectComponent
                          createAble={true}
                          isMulti={true}
                          options={[]}
                          placeholder="Input Weight (0-10) of Categories in Same Order as Categories Field"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={methods.control}
                  name="mechanics"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="mechanics"
                        className="text-sm font-medium"
                      >
                        Mechanics
                      </Label>
                      <FormControl>
                        <SelectComponent
                          createAble={false}
                          isMulti={true}
                          options={FormatFilters(mechanics)}
                          placeholder="Select Mechanics"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={methods.control}
                  name="mechanicWeights"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="mechanicWeights"
                        className="text-sm font-medium"
                      >
                        Mechanic Weights
                      </Label>
                      <FormControl>
                        <SelectComponent
                          createAble={true}
                          isMulti={true}
                          options={[]}
                          placeholder="Input Weight (0-10) of Mechanics in Same Order as Mechanics Field"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={methods.control}
                  name="publishers"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="publishers"
                        className="text-sm font-medium"
                      >
                        Publishers
                      </Label>
                      <FormControl>
                        <SelectComponent
                          createAble={true}
                          isMulti={true}
                          options={[]}
                          placeholder="Add Publishers"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={methods.control}
                  name="designers"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="designers"
                        className="text-sm font-medium"
                      >
                        Designers
                      </Label>
                      <FormControl>
                        <SelectComponent
                          createAble={true}
                          isMulti={true}
                          options={[]}
                          placeholder="Add Designers"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={methods.control}
                  name="artists"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="artists" className="text-sm font-medium">
                        Artists
                      </Label>
                      <FormControl>
                        <SelectComponent
                          createAble={true}
                          isMulti={true}
                          options={[]}
                          placeholder="Add Artists"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="grid gap-4">
                <FormField
                  control={methods.control}
                  name="quantityInStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="quantityInStock">
                        Quantity In Stock
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="quantityInStock"
                          type="number"
                          placeholder="100"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={methods.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="longDescription">
                        Long Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value}
                          id="longDescription"
                          placeholder="Detailed product description"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={methods.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="condition">
                        Product Condition
                      </FormLabel>
                      <Textarea
                        {...field}
                        value={field.value}
                        id="condition"
                        placeholder="Details about the condition of the product."
                        rows={3}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="grid gap-2">
                  <FormField
                    control={methods.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="year">Year</FormLabel>
                        <Input
                          id="year"
                          {...field}
                          value={field.value}
                          type="text"
                          placeholder="2024"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={methods.control}
                    name="playerAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="playerAge">Player Age</FormLabel>
                        <Input
                          id="playerAge"
                          type="text"
                          placeholder="8+"
                          {...field}
                          value={field.value}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="grid gap-2">
                  <FormField
                    control={methods.control}
                    name="playingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="playingTime">
                          Playing Time
                        </FormLabel>
                        <Input
                          {...field}
                          value={field.value}
                          id="playingTime"
                          type="text"
                          placeholder="30-60 minutes"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={methods.control}
                    name="complexity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="complexity">Complexity</FormLabel>
                        <Input
                          {...field}
                          value={field.value}
                          id="complexity"
                          type="text"
                          placeholder="Medium"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2 mt-4">
                <FormField
                  control={methods.control}
                  name="playerCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="playerCount">Player Count</FormLabel>
                      <Input
                        id="playerCount"
                        placeholder="2-4 players"
                        {...field}
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <FormField
                  control={methods.control}
                  name="hasFreeShipping"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          id="hasFreeShipping"
                          className="mr-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Has Free Shipping?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="isUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          id="isUsed"
                          className="mr-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>is Used?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          id="isFeatured"
                          className="mr-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Show on homepage?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-2 grid gap-6 w-[200px] mx-auto">
              <div className="flex gap-5">
                <Button type="submit">Submit Product</Button>
                <Button
                  onClick={() => {
                    if (setEditMode === undefined) {
                      router.refresh();
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
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
