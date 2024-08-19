"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";
import { object } from "zod";

const baseURL = process.env.BASE_API_URL;

export const CartActionButton = async (
  productId: number,
  quantity: number,
  method: string
) => {
  try {
    const nextCookies = cookies();
    const buyerId = nextCookies.get("buyerId")?.value;
    const user = nextCookies.get("user")?.value;

    if (user) {
      const userObject = await JSON.parse(user);
      const response = await fetch(
        `${baseURL}/basket?productId=${productId}&quantity=${quantity}`,
        {
          method: method,
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + userObject?.token,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );

      if (!response.ok) {
        return { products: [] };
      } else {
        const data = await response.json();
        cookies().set("buyerId", data.buyerId);
        revalidatePath("/basket");
        return data;
      }
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

      if (!response.ok) {
        return { products: [] };
      } else {
        const data = await response.json();
        revalidatePath("/basket");
        return data;
      }
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

      if (!response.ok) {
        return { products: [] };
      } else {
        const data = await response.json();
        cookies().set("buyerId", data.buyerId);
        revalidatePath("/basket");
        return data;
      }
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

    if (!response.ok) {
      return { products: [] };
    } else {
      const data = await response.json();
      return data;
    }
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
    "POST"
  );
};

export const fetchProducts = async (
  orderBy = "name",
  searchTerm = "",
  pageNumber = 1,
  pageSize = 12,
  categoriesSelected = "",
  mechanicsSelected = ""
) => {
  try {
    const params = new URLSearchParams({
      orderBy,
      searchTerm,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      categoriesSelected,
      mechanicsSelected,
    });

    const response = await fetch(`${baseURL}/products?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    } else {
      const data = await response.json();

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

      nextCookies.set("user", JSON.stringify(user), {
        path: "/",
        httpOnly: true, // Ensures the cookie is sent only in HTTP requests, not accessible via JavaScript
        secure: process.env.NODE_ENV === "production", // Secure in production
        maxAge: 60 * 60 * 24 * 7, // Optional: 1 week
        sameSite: "lax", // Prevents CSRF attacks
      });
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
  const user = cookies().get("user")?.value;
  let userObject = null;

  if (user) {
    userObject = await JSON.parse(user);
  }

  const response = await fetch(`${baseURL}/Account/currentUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (userObject.token || token),
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
    const user = nextCookies.get("user")?.value;
    let userObject = null;

    if (user) {
      userObject = await JSON.parse(user);
    }

    const response = await fetch(`${baseURL}/Orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `buyerId=${buyerId}`,
        Authorization: "Bearer " + userObject.token,
      },
      body: JSON.stringify({ saveAddress, shippingAddress }),
    });

    if (!response.ok) {
      return { message: "Error with submitting order" };
    } else {
      const data = await response.json();
      revalidatePath("/", "layout");
      return data;
    }
  } catch (error) {
    return { message: "Error with submitting order" };
  }
};

export const getAddress = async () => {
  const nextCookies = cookies();
  const buyerId = nextCookies.get("buyerId")?.value;
  const user = nextCookies.get("user")?.value;
  let userObject = null;

  if (user) {
    userObject = await JSON.parse(user);
  }

  const response = await fetch(`${baseURL}/Account/savedAddress`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `buyerId=${buyerId}`,
      Authorization: "Bearer " + userObject.token,
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
  const user = nextCookies.get("user")?.value;
  let userObject = null;

  if (user) {
    userObject = await JSON.parse(user);
  }

  const response = await fetch(`${baseURL}/Orders`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `buyerId=${buyerId}`,
      Authorization: "Bearer " + userObject.token,
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
  const user = nextCookies.get("user")?.value;
  let userObject = null;

  if (user) {
    userObject = await JSON.parse(user);
  }

  const response = await fetch(`${baseURL}/Payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `buyerId=${buyerId}`,
      Authorization: "Bearer " + userObject?.token,
    },
  });

  if (!response.ok) {
    return { message: "Error creating payment intent" };
  } else {
    const data = await response.json();
    return data;
  }
};

export const getFilters = async () => {
  const response = await fetch(`${process.env.BASE_API_URL}/products/filters`);

  return await response.json();
};

// CREATE A NEW PRODUCT

export const CreateProduct = async (formData: FormData) => {
  try {
    const nextCookies = cookies();
    const user = nextCookies.get("user")?.value;
    let userObject = null;

    if (user) {
      userObject = await JSON.parse(user);
    }

    const response = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userObject.token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    revalidatePath("/inventory");
    return data;
  } catch (error) {
    console.log("Error creating product in server action");
  }
};

export const UpdateProduct = async (formData: FormData) => {
  try {
    const nextCookies = cookies();
    const user = nextCookies.get("user")?.value;
    let userObject = null;

    if (user) {
      userObject = await JSON.parse(user);
    }

    const response = await fetch(`${baseURL}/products`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userObject.token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();

      revalidatePath("/inventory");
      return data;
    }
  } catch (error) {
    console.log("Error creating product in server action");
  }
};

export const DeleteProduct = async (id: number) => {
  try {
    const nextCookies = cookies();
    const user = nextCookies.get("user")?.value;
    let userObject = null;

    if (user) {
      userObject = await JSON.parse(user);
    }

    await fetch(`${baseURL}/products/${Number(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userObject.token,
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
    const user = nextCookies.get("user")?.value;
    let userObject = null;

    if (user) {
      userObject = await JSON.parse(user);
    }

    await fetch(`${baseURL}/account/deleteAccount`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userObject.token,
      },
    });

    cookies().delete("user");
    return { status: 200 };
  } catch (error) {
    console.log("Error deleting account in server action");
  }
};

export const UpdateProfileSettings = async (formData: FormData) => {
  try {
    const nextCookies = cookies();
    const user = nextCookies.get("user")?.value;
    let userObject = null;

    if (user) {
      userObject = await JSON.parse(user);
    }

    const response = await fetch(`${baseURL}/account/updateProfile`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userObject.token,
      },
      body: formData,
    });

    if (response.status === 400) {
      return { status: response.status, message: "Invalid Password" };
    }

    const data = await response.json();

    cookies().delete("user");
    cookies().set("user", JSON.stringify(data));

    revalidatePath("/account");
    return data;
  } catch (error) {
    console.log("Error updating profile in server action");
  }
};
