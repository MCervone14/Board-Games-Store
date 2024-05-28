"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface StripeWrapperProps {
  children: React.ReactNode;
}

const stripePromise = loadStripe(
  "pk_test_51PKohyLEu939SN5KMSEVgN1csWdM4QyrRWahzxhUmbr0amaAwa4fuz5lLjWAXffkSqaRpH78ZDTIhCEskQLr3khQ00Rj1F9CY6"
);

const StripeWrapper = ({ children }: StripeWrapperProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
