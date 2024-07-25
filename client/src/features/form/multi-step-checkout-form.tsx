"use client";

import {
  BreadcrumbSeparator,
  BreadcrumbList,
  Breadcrumb,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import ShippingForm from "./shipping-form";
import ReviewOrderForm from "./review-order-form";
import PaymentForm from "./payment-form";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { validationFormSchema } from "@/lib/form-schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Confirmation from "./confirmation";
import { getAddress, handleSubmitOrder } from "@/actions/server";
import { StripeElementType } from "@stripe/stripe-js";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Basket } from "@/types/basket";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface MultoStepCheckoutFormProps {
  basket: Basket;
}

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function MultiStepCheckoutForm({
  basket,
}: MultoStepCheckoutFormProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cardState, setCardState] = useState<{
    elementError: { [key in StripeElementType]?: string };
  }>({ elementError: {} });
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [paymentId, setPaymentId] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  function onCardInputChange(event: any) {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    });
    setCardComplete({
      ...cardComplete,
      [event.elementType]: event.complete,
    });
  }

  const currentValidationSchema = validationFormSchema[activeStep];

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return (
          <PaymentForm
            setClientSecret={setClientSecret}
            onCardInputChange={onCardInputChange}
            cardState={cardState}
          />
        );
      case 2:
        return <ReviewOrderForm setActiveStep={setActiveStep} />;
      case 3:
        return (
          <Confirmation
            setActiveStep={setActiveStep}
            orderNumber={orderNumber}
            paymentMessage={paymentMessage}
            paymentSucceeded={paymentSucceeded}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const methods = useForm<z.infer<typeof currentValidationSchema>>({
    mode: "all",
    resolver: currentValidationSchema
      ? zodResolver(currentValidationSchema)
      : undefined,
    defaultValues: useMemo(
      () => ({
        fullName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        saveAddress: false,
        nameOnCard: "",
      }),
      []
    ),
  });

  useEffect(() => {
    getAddress().then((res) => {
      if (res) {
        methods.reset({ ...methods.getValues(), ...res, saveAddress: false });
      }
    });
  }, [methods]);

  const handleNext = async () => {
    if (activeStep === 1) {
      const cardElement = elements?.getElement(CardNumberElement);
      const paymentCreation = await stripe?.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: {
          name: methods.getValues("nameOnCard"),
        },
      });
      if (!paymentCreation) {
        console.log("Payment creation failed");
        return;
      } else {
        console.log("Payment creation successful");
        setPaymentId(paymentCreation.paymentMethod?.id as string);
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const submitDisabled = () => {
    if (activeStep === steps.length - 2) {
      return (
        !cardComplete.cardNumber ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardCvc ||
        !methods.formState.isValid
      );
    } else {
      return !methods.formState.isValid;
    }
  };

  const onSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    if (!stripe) return;
    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret!, {
        payment_method: paymentId,
      });
      if (paymentResult?.paymentIntent?.status === "succeeded") {
        const orderNumber = await handleSubmitOrder(values);
        setOrderNumber(orderNumber);
        setPaymentSucceeded(true);
        setPaymentMessage("Payment successful");
        setActiveStep((prev) => prev + 1);
        setIsLoading(false);
        setClientSecret(null);
        setPaymentId("");
      } else {
        setPaymentMessage(paymentResult?.error?.message!);
        setActiveStep((prev) => prev + 1);
        setPaymentSucceeded(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center mt-20  min-h-screen">
        <div className="w-full max-w-3xl bg-white shadow-lg">
          <div className="px-6 py-4 border-b bg-gray-200 rounded-t-lg">
            <Breadcrumb className="m-2">
              <>
                <BreadcrumbList className="flex justify-between">
                  {steps.map((label, index) => (
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          index === activeStep ? "bg-gray-900" : "bg-gray-400",
                          ` text-white rounded-full w-8 h-8 flex items-center justify-center font-medium`
                        )}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={cn(
                          index === activeStep
                            ? "text-blue-600"
                            : "text-gray-600 "
                        )}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </BreadcrumbList>
                <BreadcrumbSeparator className="last:hidden" />
              </>
            </Breadcrumb>
          </div>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {getStepContent(activeStep)}
            <div className="p-5 flex gap-5 justify-end">
              <Button
                className={`${
                  (activeStep === 0 || activeStep === 3) && "hidden"
                }`}
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="button"
                className={`${
                  (activeStep === steps.length - 1 || activeStep === 3) &&
                  "hidden"
                }`}
                onClick={handleNext}
                disabled={submitDisabled()}
              >
                Next
              </Button>
              <Button
                type="submit"
                className={`${activeStep !== steps.length - 1 && "hidden"}`}
              >
                Confirm
              </Button>
              <Button
                type="button"
                onClick={() => router.replace("/boardgames")}
                className={`${activeStep !== 3 && "hidden"} hover:bg-blue-600`}
              >
                Continue Shopping
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
