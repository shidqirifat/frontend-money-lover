import { z } from "zod";
import { ErrorResponse, HttpResponse } from "./http";

export const formLoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export const formRegisterSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must contain at least 2 character(s)"),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must contain at least 8 character(s)"),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export const formProfileSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must contain at least 2 character(s)"),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine(
    (values) => values.password.length === 0 || values.password.length >= 8,
    {
      message: "Password must contain at least 8 character(s)",
      path: ["password"],
    }
  )
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export type TFormLogin = z.infer<typeof formLoginSchema>;

export type TFormRegister = z.infer<typeof formRegisterSchema>;

export type TFormProfile = z.infer<typeof formProfileSchema>;

export type AuthResponse = HttpResponse<{
  name: string;
  email: string;
  token: string;
}>;

export type AuthError = ErrorResponse<{
  message: string;
}>;
