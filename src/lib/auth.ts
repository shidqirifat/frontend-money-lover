import { z } from "zod";

export const formLoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export type TFormLogin = z.infer<typeof formLoginSchema>;
