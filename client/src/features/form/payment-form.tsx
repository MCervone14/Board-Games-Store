"use client";

import { CreatePaymentIntent } from "@/actions/server";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { StripeElementType } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface PaymentFormProps {
  cardState: { elementError: { [key in StripeElementType]?: string } };
  onCardInputChange: (event: any) => void;
  setClientSecret: (clientSecret: string) => void;
}

const PaymentForm = ({
  onCardInputChange,
  cardState,
  setClientSecret,
}: PaymentFormProps) => {
  const form = useFormContext();

  useEffect(() => {
    const paymentIntent = async () => {
      const response = await CreatePaymentIntent();
      setClientSecret(response.clientSecret);
    };

    paymentIntent();
  }, []);

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
          <FormField
            control={form.control}
            name="nameOnCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="nameOnCard">Name on Card</FormLabel>
                <FormControl>
                  <Input id="nameOnCard" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border p-2 rounded">
            <CardNumberElement
              onChange={onCardInputChange}
              onReady={(element) => element.focus()}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "foreground-muted",
                    },
                  },
                },
              }}
            />
          </div>
          <small className="text-red-800 px-2">
            {cardState.elementError.cardNumber || ""}
          </small>
          <div className="border rounded p-2">
            <CardExpiryElement
              onChange={onCardInputChange}
              onReady={(element) => element.focus()}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "foreground-muted",
                    },
                  },
                },
              }}
            />
          </div>
          <small className="text-red-800 px-2">
            {cardState.elementError.cardExpiry || ""}
          </small>
          <div className="border rounded p-2 mb-5">
            <CardCvcElement
              onChange={onCardInputChange}
              onReady={(element) => element.focus()}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "foreground-muted",
                    },
                  },
                },
              }}
            />
          </div>
          <small className="text-red-800 px-2">
            {cardState.elementError.cardCvc || ""}
          </small>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
