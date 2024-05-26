import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 4 characters.",
    })
    .max(20, {
      message: "Username can not be more than 20 characters long.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, {
      message: "Password can not be more than 32 characters long.",
    }),
});

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 4 characters.",
    })
    .max(20, {
      message: "Username can not be more than 20 characters long.",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, {
      message: "Password can not be more than 32 characters long.",
    }),
});

export const validationFormSchema = [
  z.object({
    fullName: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(75, { message: "Full Name can not be more than 75 characters." }),
    address1: z.string(),
    address2: z.string(),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(2),
    zipCode: z.string().min(5).max(5),
    country: z.string().min(2).max(2),
    saveAddress: z.boolean(),
  }),
  z.object({
    cardNumber: z.string(),
    expiration: z.string(),
    cvc: z.string(),
    nameOnCard: z.string().min(2).max(75),
  }),
];
