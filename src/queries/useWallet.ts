import { createWalletFn, getSummaryWalletFn } from "@/services/wallet.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useWallet() {
  const summaryWalletQuery = useQuery({
    queryKey: ["summary-wallet"],
    queryFn: getSummaryWalletFn,
    staleTime: 200,
  });

  const successMutationHandler = (message: string) => {
    summaryWalletQuery.refetch();
    toast.success(message);
  };

  const createWalletMutation = useMutation({
    mutationFn: createWalletFn,
    onSuccess: () => {
      successMutationHandler("Successfully create new wallet")
    }
  })

  return { summaryWalletQuery, createWalletMutation };
}
