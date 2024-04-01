import {
  createWalletFn,
  deleteWalletFn,
  editWalletFn,
  getSummaryWalletFn,
} from "@/services/wallet.service";
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
      successMutationHandler("Successfully create new wallet");
    },
  });

  const editWalletMutation = useMutation({
    mutationFn: editWalletFn,
    onSuccess: () => {
      successMutationHandler("Successfully update wallet");
    },
  });

  const deleteWalletMutation = useMutation({
    mutationFn: deleteWalletFn,
    onSuccess: () => {
      successMutationHandler("Successfully delete wallet");
    },
  });

  return {
    summaryWalletQuery,
    createWalletMutation,
    editWalletMutation,
    deleteWalletMutation,
  };
}
