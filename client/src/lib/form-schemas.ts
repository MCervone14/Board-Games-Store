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
