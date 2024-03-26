export type WalletResponse = {
  id: number;
  name: string;
  balance: number;
};

export type SummaryWalletResponse = {
  total_balance: number;
  wallets: Array<WalletResponse>;
};
