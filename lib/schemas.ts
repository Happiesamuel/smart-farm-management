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
