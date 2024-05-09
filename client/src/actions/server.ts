"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const CartActionButton = async (
  productId: number,
  quantity: number,
  method: string,
  cookie?: boolean
) => {
  const nextCookies = cookies();
  const buyerId = nextCookies.get("buyerId")?.value;

  const response = await fetch(
    `http://localhost:5000/api/basket?productId=${productId}&quantity=${quantity}`,
    {
      method: method,
      headers: {
        contentType: "application/json",
        Cookie: `buyerId=${buyerId}`,
      },
      body: JSON.stringify({ productId, quantity }),
    }
  );

  if (cookie) {
    const data = await response.json();
    cookies().set("buyerId", data.buyerId);
  }

  revalidatePath("/basket");
};

export const getBasket = async () => {
  const nextCookies = cookies();
  const buyerId = await nextCookies.get("buyerId");

  const response = await fetch("http://localhost:5000/api/basket", {
    headers: {
      "Content-Type": "application/json",
      Cookie: `buyerId=${buyerId?.value}`,
    },
  });

  const data = await response.json();
  return data;
};

export const handleAddToCart = async (formData: FormData) => {
  console.log(formData);

  const rawFormData = {
    productId: formData.get("productId"),
    quantity: formData.get("quantity"),
  };

  if (!rawFormData.quantity) return;

  await CartActionButton(
    Number(rawFormData.productId),
    Number(rawFormData.quantity),
    "POST",
    true
  );
};
