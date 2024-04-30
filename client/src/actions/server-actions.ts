"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addProductToCart = async (productId: any, quantity: any) => {
  const nextCookies = cookies();
  const buyerId = await nextCookies.get("buyerId");

  console.log("buyerId", buyerId);

  const response = await fetch(
    `http://localhost:5000/api/basket?productId=${productId}&quantity=${quantity}`,
    {
      method: "POST",
      headers: {
        contentType: "application/json",
        Cookie: `buyerId=${buyerId?.value}`,
      },
      next: {
        tags: ["cart"],
      },
      body: JSON.stringify({ productId, quantity }),
    }
  );

  const data = await response.json();
  cookies().set("buyerId", data.buyerId);
  revalidateTag("cart");
};
