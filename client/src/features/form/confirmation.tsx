"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ConfirmationProps {
  orderNumber: string;
  paymentMessage: string;
  paymentSucceeded: boolean;
  setActiveStep: (step: number) => void;
}

const Confirmation = ({
  orderNumber,
  paymentMessage,
  paymentSucceeded,
  setActiveStep,
}: ConfirmationProps) => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          {paymentSucceeded ? (
            <>
              <Image
                src="/icons/check-mark-128.png"
                alt="check mark created by Wahyu.Setyanto from flaticon"
                width={128}
                height={128}
                className="mx-auto"
              />
              <h2 className="text-2xl text-blue-600 font-bold">
                {paymentMessage}!
              </h2>
              <p className="text-xl">Thank you for your purchase!</p>
              <p className="text-xl">
                This is a confirmation of your order! Your order number is:{" "}
                {orderNumber}
              </p>
            </>
          ) : (
            <>
              <Image
                src="/icons/attention-128.png"
                alt="attention icon created by sonnycandra from flaticon"
                width={128}
                height={128}
                className="mx-auto"
              />
              <div className="space-y-6">
                <h2 className="text-2xl text-red-600 font-bold">
                  {paymentMessage}
                </h2>
                <p className="text-xl">
                  Unfortunately, your payment was not successful.
                </p>
                <p>
                  Please try again or try contacting us to get this problem
                  resolved.
                </p>
                <Button onClick={() => setActiveStep(1)}>
                  Restart Payment Process
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
