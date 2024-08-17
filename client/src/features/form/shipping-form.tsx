"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ShippingForm = () => {
  const form = useFormContext();

  const handleShippingInfo = () => {
    form.setValue("fullName", "John Doe", { shouldValidate: true });
    form.setValue("address1", "123 Main St", { shouldValidate: true });
    form.setValue("address2", "Apt B", { shouldValidate: true });
    form.setValue("city", "New York City", { shouldValidate: true });
    form.setValue("state", "NY", { shouldValidate: true });
    form.setValue("zipCode", "10001", { shouldValidate: true });
    form.setValue("country", "US", { shouldValidate: true });
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Shipping Address</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your shipping address.
          </p>
        </div>
        <div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="address2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="Apt B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZipCode</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center">
          <FormField
            control={form.control}
            name="saveAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    id="saveAddress"
                    className="mr-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!form.formState.isDirty}
                  />
                </FormControl>
                <FormLabel>
                  {" "}
                  Would you like to save this address for future purchases?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleShippingInfo}
            className="bg-blue-600 text-white"
          >
            Fill in Shipping Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
