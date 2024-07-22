import { getBasket } from "@/actions/server";
import { notFound } from "next/navigation";
import MultiStepCheckoutForm from "@/features/form/multi-step-checkout-form";
import StripeWrapper from "@/features/stripe/stripe-wrapper";

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
