"use client";

import {
  BreadcrumbLink,
  BreadcrumbItem,
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
import Link from "next/link";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function MultiStepCheckoutForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentValidationSchema = validationFormSchema[activeStep];

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <ReviewOrderForm />;
      case 3:
        return <Confirmation orderNumber={orderNumber} />;
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
        cardNumber: "",
        expiration: "",
        cvc: "",
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
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const orderNumber = await handleSubmitOrder(values);
      setOrderNumber(orderNumber);
      setActiveStep((prev) => prev + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center mt-20  min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <div className="px-6 py-4 border-b dark:border-gray-800">
            <Breadcrumb className="m-2">
              <>
                <BreadcrumbList className="flex justify-between">
                  {steps.map((label, index) => (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink
                        className={`${
                          index === activeStep && "text-blue-600"
                        } hover:underline`}
                      >
                        {label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
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
                disabled={!methods.formState.isValid}
              >
                Next
              </Button>
              <Button
                type="submit"
                className={`${activeStep !== steps.length - 1 && "hidden"}`}
              >
                Confirm
              </Button>
              <Link href="/boardgames">
                <Button
                  type="button"
                  className={`${activeStep !== 3 && "hidden"}`}
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
