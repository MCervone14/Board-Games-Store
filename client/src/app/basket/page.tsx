import { getBasket } from "@/actions/server";
import { Table } from "@/components/ui/table";
import BasketDetails from "@/features/basket/basket-details";
import { notFound } from "next/navigation";

const BasketPage = async () => {
  const basket = await getBasket();

  if (!basket) {
    return notFound();
  }

  return (
    <Table className="container lg:h-screen  mx-auto w-[375px] sm:w-full flex flex-col py-10 bg-secondary">
      <BasketDetails basket={basket} />
    </Table>
  );
};

export default BasketPage;
