import { type ClassValue, clsx } from "clsx";
import { Console } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createFormData = (data: any) => {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] !== undefined) {
      if (Array.isArray(data[key])) {
        if (
          key === "categories" ||
          key === "mechanics" ||
          key === "artists" ||
          key === "designers" ||
          key === "publishers" ||
          key === "categoryWeights" ||
          key === "mechanicWeights"
        ) {
          const values = data[key].map((item: any) => item.value);
          values.forEach((value: any) => {
            formData.append(key, value);
          });
        } else {
          data[key].forEach((item: any) => {
            formData.append(`${key}[]`, item);
          });
        }
      } else {
        let value = data[key];
        formData.append(key, value);
      }
    }
  }

  return formData;
};

export const ProductPrice = (price: number, salePrice = 0) => {
  if (salePrice) {
    return `$${(salePrice / 100).toFixed(2)} (${(
      ((price - salePrice) / price) *
      100
    ).toFixed(0)}% off)`;
  }

  return `$${(price / 100).toFixed(2)}`;
};
