"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";

const baseURL = process.env.BASE_API_URL;

export const CartActionButton = async (
  productId: number,
  quantity: number,
  method: string,
  cookie?: boolean
) => {
  try {
    const nextCookies = cookies();
    const buyerId = nextCookies.get("buyerId")?.value;
    const token = nextCookies.get("token")?.value;
    let user = null;

    if (token) {
      user = await getCurrentUser(token);
      const response = await fetch(
        `${baseURL}/basket?productId=${productId}&quantity=${quantity}`,
        {
          method: method,
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      const data = await response.json();
      cookies().set("buyerId", data.buyerId);
      revalidatePath("/basket");
      return data;
    } else if (buyerId) {
      const response = await fetch(
        `${baseURL}/basket?productId=${productId}&quantity=${quantity}`,
        {
          method: method,
          headers: {
            contentType: "application/json",
            Cookie: `buyerId=${buyerId}`,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      const data = await response.json();
      revalidatePath("/basket");
      return data;
    } else {
      const response = await fetch(
        `${baseURL}/basket?productId=${productId}&quantity=${quantity}`,
        {
          method: method,
          headers: {
            contentType: "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      const data = await response.json();
      cookies().set("buyerId", data.buyerId);
      revalidatePath("/basket");
      return data;
    }
  } catch (error) {
    return { products: [] };
  }
};

export const getBasket = async () => {
  try {
    const nextCookies = cookies();
    const buyerId = nextCookies.get("buyerId");

    const response = await fetch(`${baseURL}/basket`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `buyerId=${buyerId?.value}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { products: [] };
  }
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
  categoriesSelected?: string,
  mechanicsSelected?: string
) => {
  try {
    if (
      orderBy === "name" &&
      searchTerm === "" &&
      categoriesSelected === "" &&
      mechanicsSelected === "" &&
      pageNumber === 1 &&
      pageSize === 12
    ) {
      const response = await fetch(`${baseURL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } else {
      const response = await fetch(
        `${baseURL}/products?orderBy=${orderBy}&searchTerm=${searchTerm}&categoriesSelected=${categoriesSelected}&mechanicsSelected=${mechanicsSelected}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
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
  } catch (error) {
    return { products: [], paginationMetaData: {} };
  }
};

export const Login = async (username: string, password: string) => {
  try {
    const nextCookies = cookies();
    const buyerId = nextCookies.get("buyerId")?.value;

    const response = await fetch(`${baseURL}/Account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `buyerId=${buyerId}`,
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      const user = await getCurrentUser(data.token);
      nextCookies.set("buyerId", user?.basket?.buyerId);
    }

    if (data.token) {
      nextCookies.set(`token`, data.token);
    }

    return data;
  } catch (error) {
    return { message: "Error with Login." };
  }
};

export const Register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${baseURL}/Account/register`, {
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
  } catch (error) {
    return { message: "Error with Registering" };
  }
};

export const getCurrentUser = async (token?: string | undefined) => {
  const cookie = cookies().get("token")?.value;

  if (!token && !cookie) {
    return null;
  }

  const response = await fetch(`${baseURL}/Account/currentUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (token || cookie),
    },
    credentials: "include",
  });

  if (response.status !== 401) {
    const data = await response.json();
    return data;
  }

  return null;
};

export const removeCookie = (name: string) => {
  const nextCookies = cookies();
  nextCookies.delete(name);
};

export const handleSubmitOrder = async (values: FieldValues) => {
  try {
    const { nameOnCard, saveAddress, ...shippingAddress } = values;
    const nextCookies = cookies();
    const buyerId = nextCookies.get("buyerId")?.value;
    const token = nextCookies.get("token")?.value;

    const response = await fetch(`${baseURL}/Orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `buyerId=${buyerId}`,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ saveAddress, shippingAddress }),
    });

    const data = await response.json();
    revalidatePath("/basket");
    return data;
  } catch (error) {
    return { message: "Error with submitting order" };
  }
};

export const getAddress = async () => {
  const nextCookies = cookies();
  const buyerId = nextCookies.get("buyerId")?.value;
  const token = nextCookies.get("token")?.value;

  const response = await fetch(`${baseURL}/Account/savedAddress`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `buyerId=${buyerId}`,
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

export const getOrders = async () => {
  const nextCookies = cookies();
  const buyerId = nextCookies.get("buyerId")?.value;
  const token = nextCookies.get("token")?.value;

  const response = await fetch(`${baseURL}/Orders`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `buyerId=${buyerId}`,
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    return { orders: [] };
  } else {
    const data = await response.json();
    return data;
  }
};

export const CreatePaymentIntent = async () => {
  const nextCookies = cookies();
  const buyerId = nextCookies.get("buyerId")?.value;
  const token = nextCookies.get("token")?.value;

  const response = await fetch(`${baseURL}/Payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `buyerId=${buyerId}`,
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const getFilters = async () => {
  const response = await fetch(`${process.env.BASE_API_URL}/products/filters`);

  return await response.json();
};

// CREATE A NEW PRODUCT

export const CreateProduct = async (formData: FormData) => {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token")?.value;

    const response = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    revalidatePath("/");
    revalidatePath("/inventory");
    return data;
  } catch (error) {
    console.log("Error creating product in server action");
  }
};

export const UpdateProduct = async (formData: FormData) => {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token")?.value;

    const response = await fetch(`${baseURL}/products`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    revalidatePath("/");
    revalidatePath("/inventory");
    return data;
  } catch (error) {
    console.log("Error creating product in server action");
  }
};

export const DeleteProduct = async (id: number) => {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token")?.value;

    await fetch(`${baseURL}/products/${Number(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    revalidatePath("/inventory");
  } catch (error) {
    console.log("Error deleting product in server action");
  }
};
export const redirectHard = async (url: string) => {
  redirect(url);
};

export const DeleteAccount = async () => {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token")?.value;

    await fetch(`${baseURL}/account/deleteAccount`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    cookies().delete("token");
    return { ok: 200 };
  } catch (error) {
    console.log("Error deleting account in server action");
  }
};

export const UpdateProfileSettings = async (formData: FormData) => {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token")?.value;

    const response = await fetch(`${baseURL}/account/updateProfile`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (response.status === 400) {
      return { status: response.status, message: "Invalid Password" };
    }

    const data = await response.json();
    console.log(data);

    cookies().delete("token");
    cookies().set("token", data.token);

    revalidatePath("/account");
    return data;
  } catch (error) {
    console.log("Error updating profile in server action");
  }
};
