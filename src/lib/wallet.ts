import { z } from "zod";
import { formatNumber } from "./currency";

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
  balance: z.string().regex(/^[\d.]+$/, {
    message: "Only numbers is allowed.",
  }),
});

export type TFormWallet = z.infer<typeof formWalletSchema>;

export type PayloadWallet = {
  name: string;
  balance: number;
};

export const generatePayloadWallet = (form: TFormWallet): PayloadWallet => {
  return {
    name: form.name,
    balance: formatNumber(form.balance),
  };
};
