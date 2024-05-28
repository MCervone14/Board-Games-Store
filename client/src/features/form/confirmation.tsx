"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ConfirmationProps {
  orderNumber: string;
  paymentMessage: string;
  paymentSucceeded: boolean;
}

const Confirmation = ({
  orderNumber,
  paymentMessage,
  paymentSucceeded,
}: ConfirmationProps) => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          {paymentSucceeded ? (
            <>
              <h2 className="text-2xl font-bold">
                Confirmation of your order! Your order number is: {orderNumber}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {paymentMessage}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Payment failed</h2>
              <p>{paymentMessage}</p>
              <Button onClick={(e) => router.back}>
                Go back, to try again
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
