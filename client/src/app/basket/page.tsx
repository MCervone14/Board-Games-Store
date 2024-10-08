import { getBasket } from "@/actions/server";
import { Table } from "@/components/ui/table";
import BasketDetails from "@/features/basket/basket-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Basket | Tabletop_Zealots",
  description: "View your basket and checkout.",
};

const BasketPage = async () => {
  const basket = await getBasket();

  if (!basket) {
    return notFound();
  }

  return (
    <Table className="container lg:h-screen  mx-auto w-[375px] sm:w-full flex flex-col py-10">
      <BasketDetails basket={basket} />
    </Table>
  );
};

export default BasketPage;
