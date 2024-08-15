import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
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
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters.",
    })
    .refine((val) => !val || val.length <= 32, {
      message: "Password cannot be more than 32 characters long.",
    })
    .refine(
      (val) => {
        if (!val) return true;
        const containsUppercase = /[A-Z]/.test(val);
        const containsLowercase = /[a-z]/.test(val);
        const containsNumber = /[0-9]/.test(val);
        const containsSpecialChar =
          /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(val);
        return (
          containsUppercase &&
          containsLowercase &&
          containsNumber &&
          containsSpecialChar
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
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
    nameOnCard: z.string().min(2).max(75),
  }),
];

export const AddProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  files: z.array(
    z.object({
      path: z.string(),
      preview: z.string(),
      name: z.string(),
      size: z.number(),
      type: z.string(),
    })
  ),
  categories: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  mechanics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  designers: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  publishers: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  artists: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  quantityInStock: z.coerce.number(),
  salePrice: z.coerce.number(),
  year: z.string(),
  playingTime: z.string(),
  playerCount: z.string(),
  playerAge: z.string(),
  longDescription: z.string(),
  complexity: z.string(),
  isUsed: z.boolean(),
  hasFreeShipping: z.boolean(),
  condition: z.string(),
  pictureUrl: z.string(),
  isFeatured: z.boolean(),
  categoryWeights: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  mechanicWeights: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export const ProfileSettingsSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username cannot be more than 20 characters long." }),
  email: z.string().email(),
  currentPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(32, { message: "Password cannot be more than 32 characters long." })
    .optional()
    .or(z.literal("")),
  newPassword: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters.",
    })
    .refine((val) => !val || val.length <= 32, {
      message: "Password cannot be more than 32 characters long.",
    })
    .refine(
      (val) => {
        if (!val) return true;
        const containsUppercase = /[A-Z]/.test(val);
        const containsLowercase = /[a-z]/.test(val);
        const containsNumber = /[0-9]/.test(val);
        const containsSpecialChar =
          /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(val);
        return (
          containsUppercase &&
          containsLowercase &&
          containsNumber &&
          containsSpecialChar
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    )
    .or(z.literal("")),
  confirmPassword: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters.",
    })
    .refine((val) => !val || val.length <= 32, {
      message: "Password cannot be more than 32 characters long.",
    })
    .refine(
      (val) => {
        if (!val) return true;
        const containsUppercase = /[A-Z]/.test(val);
        const containsLowercase = /[a-z]/.test(val);
        const containsNumber = /[0-9]/.test(val);
        const containsSpecialChar =
          /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(val);
        return (
          containsUppercase &&
          containsLowercase &&
          containsNumber &&
          containsSpecialChar
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    )
    .or(z.literal("")),
});
