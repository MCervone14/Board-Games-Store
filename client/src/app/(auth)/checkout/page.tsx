import { getBasket } from "@/actions/server";
import { notFound } from "next/navigation";
import MultiStepCheckoutForm from "@/features/form/multi-step-checkout-form";
import StripeWrapper from "@/features/stripe/stripe-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Tabletop_Zealots",
  description: "Checkout and pay for your items.",
};

const CheckoutPage = async () => {
  const basket = await getBasket();

  if (!basket) {
    return notFound();
  }

  return (
    <StripeWrapper>
      <MultiStepCheckoutForm basket={basket} />
    </StripeWrapper>
  );
};

export default CheckoutPage;
