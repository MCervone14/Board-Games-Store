import { getBasket } from "@/actions/server";
import BasketDetails from "@/features/basket/basket-details";
import { notFound } from "next/navigation";

const BasketPage = async () => {
  const basket = await getBasket();

  if (!basket) {
    return notFound();
  }

  return (
    <>
      <BasketDetails basket={basket} />
    </>
  );
};

export default BasketPage;
