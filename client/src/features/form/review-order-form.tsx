"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

const ReviewOrderForm = () => {
  const form = useFormContext();
  const values = form.getValues();

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Review Your Information</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Review information before placing your order.
          </p>
        </div>
        <div>
          <div className="grid gap-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <h3 className="font-medium">Shipping Address</h3>
                <p className="text-gray-500">
                  {values.address1} {values.address2}, {values.city},{" "}
                  {values.state} {values.zip}, {values.country}
                </p>
              </div>
              <Link
                className="text-blue-500 hover:underline"
                prefetch={false}
                href={"#"}
              >
                Change
              </Link>
            </div>
            <Separator />
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <h3 className="font-medium">Payment Method</h3>
                <p className="text-gray-500">
                  Visa ending in 1111, Expires 12/2025
                </p>
              </div>
              <Link
                className="text-blue-500 hover:underline"
                prefetch={false}
                href="#"
              >
                Change
              </Link>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="">
                <h3 className="font-medium">Order Summary</h3>
                <div className="grid gap-2 text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$99.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$8.92</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">Total</p>
                <p className="text-2xl font-bold">$112.92</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderForm;
