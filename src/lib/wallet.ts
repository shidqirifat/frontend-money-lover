import { z } from "zod";

export type WalletResponse = {
  id: number;
  name: string;
  balance: number;
};

export type SummaryWalletResponse = {
  total_balance: number;
  wallets: Array<WalletResponse>;
};

export const formWalletSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 character(s)"),
  balance: z
    .string()
    .regex(/^[\d.]+$/, {
      message: "Only numbers is allowed.",
    })
});

export type TFormWallet = z.infer<typeof formWalletSchema>;