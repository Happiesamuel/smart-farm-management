import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ message: "Please enter your email" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string({ message: "Please enter your password" }).min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export const forgottenPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});
export const recoverPasswordFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });
export const setPasswordFormSchema = z
  .object({
    password: z.string({ message: "Please enter your password" }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string({ message: "Please enter your password" })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });
export const signupFormSchema = z
  .object({
    username: z.string({ message: "Please enter your username" }).min(2, {
      message: "Username must be at least 2 characters.",
    }),
    // country: z.string({
    //   required_error: "Please select a country.",
    // }),
    email: z
      .string({ message: "Please enter your email" })
      .email({ message: "Please enter a valid email address" }),
    password: z.string({ message: "Please enter your password" }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string({ message: "Please enter your password" })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });

export const financeSaleSchema = z.object({
  crop: z
    .string({ message: "Please select a crop" })
    .min(1, "Please select a crop"),
  field: z.string({ message: "Field is required" }).min(1, "Field is required"),
  quantity: z.string({ message: "Quantity is required" }).min(1, {
    message: "Quantity must be at least a characters.",
  }),
  unit: z.string({ message: "Unit is required" }).min(1, "Please select  unit"),
  unitPrice: z.string({ message: "Please enter unit price" }).min(2, {
    message: "Unit price must be at least 2 characters.",
  }),
  totalAmount: z.string({ message: "Please enter total amount" }).min(2, {
    message: "Total amountt must be at least 2 characters.",
  }),
  saleDate: z
    .string({ message: " Date is required" })
    .min(1, "Date is required"),
  buyer: z.string({ message: "Please enter buyer's name" }).min(2, {
    message: "Buyer's must be at least 2 characters.",
  }),
  paymentMethod: z
    .string({ message: "Please select payment method" })
    .min(1, "Please select a payment method"),
  notes: z.string().optional(),
});
export const financeExpenseSchema = z.object({
  category: z
    .string({ message: "Please select a category" })
    .min(1, "Please select a category"),

  amount: z.string({ message: "Please enter total amount" }).min(2, {
    message: "Total amountt must be at least 2 characters.",
  }),
  date: z.string({ message: " Date is required" }).min(1, "Date is required"),

  paymentMethod: z
    .string({ message: "Please select payment method" })
    .min(1, "Please select a payment method"),
  notes: z.string().optional(),
  description: z
    .string({ message: "descripton is required" })
    .min(10, { message: "description must be at least 10 characters." }),
  receipt: z
    .any()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB",
    })
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      {
        message: "Only JPG, PNG or PDF allowed",
      },
    )
    .optional(),
});
