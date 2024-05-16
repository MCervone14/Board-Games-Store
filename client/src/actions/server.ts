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

export const fetchProducts = async (
  orderBy?: string,
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number,
  types?: string[]
) => {
  if (
    orderBy === "name" &&
    searchTerm === "" &&
    types?.length === 0 &&
    pageNumber === 1 &&
    pageSize === 12
  ) {
    const response = await fetch(`http://localhost:5000/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      `http://localhost:5000/api/products?orderBy=${orderBy}&searchTerm=${searchTerm}&types=${types}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    revalidatePath("/boardgames");

    return data;
  }
};

export const Login = async (username: string, password: string) => {
  const response = await fetch("http://localhost:5000/api/Account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (data.token.value !== undefined || data.token !== null) {
    cookies().set("token", data.token);
  }

  return data;
};

export const Register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch("http://localhost:5000/api/Account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (response.status === 400) {
    const data = await response.json();
    return data;
  }

  if (response.status === 201) {
    const data = await Login(username, password);
    return data;
  }
};

export const getCurrentUser = async (token: string | undefined) => {
  if (!token) return null;
  const response = await fetch(
    "http://localhost:5000/api/Account/currentUser",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (response.status !== 401) {
    const data = await response.json();
    return data;
  }

  return null;
};

export const removeCookie = (name: string) => {
  cookies().delete(name);
};
