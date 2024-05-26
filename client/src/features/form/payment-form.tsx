"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const PaymentForm = () => {
  const form = useFormContext();

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Payment Information</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credit card information.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1230-2232-2323-2323" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {" "}
              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="expireDate">Expiration Date</FormLabel>
                    <FormControl>
                      <Input id="expireDate" placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="cvc">Security Key</FormLabel>
                    <FormControl>
                      <Input id="cvc" placeholder="123" {...field} />
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
              name="nameOnCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="NameOnCard">Name on Card</FormLabel>
                  <FormControl>
                    <Input id="nameOnCard" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
