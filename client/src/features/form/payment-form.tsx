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
import { Label } from "@/components/ui/label";
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
          <div>
            <Label>Credit Card</Label>
            <div className="border p-2 rounded">
              <CardNumberElement
                onChange={onCardInputChange}
                onReady={(element) => element.focus()}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#000",
                      "::placeholder": {
                        color: "foreground-muted",
                      },
                    },
                  },
                }}
              />
            </div>
            <p className="text-red-800 px-2">
              {cardState.elementError.cardNumber || ""}
            </p>
          </div>
          <div>
            <Label>Exp Date</Label>
            <div className="border rounded p-2">
              <CardExpiryElement
                onChange={onCardInputChange}
                onReady={(element) => element.focus()}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#000",
                      "::placeholder": {
                        color: "foreground-muted",
                      },
                    },
                  },
                }}
              />
            </div>
            <p className="text-red-800 px-2">
              {cardState.elementError.cardExpiry || ""}
            </p>
          </div>
          <div>
            <Label>CVC </Label>
            <div className="border rounded p-2">
              <CardCvcElement
                onChange={onCardInputChange}
                onReady={(element) => element.focus()}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#000",
                      "::placeholder": {
                        color: "foreground-muted",
                      },
                    },
                  },
                }}
              />
            </div>
            <p className="text-red-800 px-2">
              {cardState.elementError.cardCvc || ""}
            </p>
          </div>
          <div className="flex flex-col items-end gap-5">
            <p className="text-center text-red-600">
              NOTE: This is a demo application. Use the following test card {""}
              <span className="font-bold text-green-500">
                4242-4242-4242-4242{" "}
              </span>{" "}
              for "successful" payment &{" "}
              <span className="font-bold">4000-0000-0000-9995</span> for
              "unsuccessful" payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
