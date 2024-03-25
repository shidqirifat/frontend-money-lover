import { z } from "zod";
import { ErrorResponse, HttpResponse } from "./http";

export const formLoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export const formRegisterSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(8),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export type TFormLogin = z.infer<typeof formLoginSchema>;

export type TFormRegister = z.infer<typeof formRegisterSchema>;

export type AuthResponse = HttpResponse<{
  name: string;
  email: string;
  token: string;
}>;

export type RegisterError = ErrorResponse<{
  message: "Email is registered";
}>;
