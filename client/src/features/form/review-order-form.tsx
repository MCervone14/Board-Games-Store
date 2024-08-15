"use client";

import { Separator } from "@/components/ui/separator";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getBasket } from "@/actions/server";
import { Basket } from "@/types/basket";

interface ReviewOrderFormProps {
  setActiveStep: (step: number) => void;
}

const ReviewOrderForm = ({ setActiveStep }: ReviewOrderFormProps) => {
  const [basket, setBasket] = useState<Basket>();
  const form = useFormContext();
  const values = form.getValues();

  useEffect(() => {
    const getUserBasket = async () => {
      const basket = await getBasket();
      setBasket(basket);
    };

    getUserBasket();
  }, []);

  let subtotal = 0;
  if (basket?.items) {
    subtotal = basket?.items.reduce(
      (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
      0
    );
  }
  let shipping = 0;
  if (subtotal) {
    shipping = subtotal > 10000 ? 0 : 500;
  }

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
              <div className="text-gray-500">
                <h3 className="font-bold mb-2 underline text-gray-700">
                  Shipping Address
                </h3>
                <p>{values.fullName}</p>
                <p>
                  {values.address1} {values.address2},
                </p>
                <p>
                  {values.city}, {values.state} {values.zip}, {values.country}
                </p>
              </div>
              <Button
                onClick={() => setActiveStep(0)}
                variant="link"
                className="text-blue-500 hover:underline text-md"
              >
                Change
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="">
                <h3 className="font-bold mb-2 underline text-gray-700">
                  Order Summary
                </h3>
                <div className="grid gap-2 text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(Number(subtotal) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${(shipping / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Separator />

              <div className="text-right">
                <p className="font-medium">Total</p>
                <p className="text-2xl font-bold">
                  ${((Number(subtotal) + shipping) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderForm;
