import { getSummaryWalletFn } from "@/services/wallet.service";
import { useQuery } from "@tanstack/react-query";

export default function useWallet() {
  const summaryWalletQuery = useQuery({
    queryKey: ["summary-wallet"],
    queryFn: getSummaryWalletFn,
  });

  return { summaryWalletQuery };
}
