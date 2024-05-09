import { getBasket } from "@/actions/server";
import BasketDetails from "@/features/basket/basket-details";

const BasketPage = async () => {
  const basket = await getBasket();
  return (
    <>
      <BasketDetails basket={basket} />
    </>
  );
};

export default BasketPage;
