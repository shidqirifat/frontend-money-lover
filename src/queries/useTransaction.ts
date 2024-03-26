import { getNextMonth } from "@/lib/date";
import {
  BaseParamsTransaction,
  ParamsGetTransaction,
  createTransactionFn,
  editTransactionFn,
  getSummaryTransactionFn,
  getTransactionFn,
} from "@/services/transaction.service";
import useFilter from "@/stores/filter";
import useTabMonth from "@/stores/tabMonth";
import { useDebouncedValue } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";
import { toast } from "react-toastify";

export default function useTransaction() {
  const { category, keyword } = useFilter();
  const [debouncedKeyword] = useDebouncedValue(keyword, 300);
  const { activeMonth } = useTabMonth();

  const successMutationHandler = (message: string) => {
    transactionQuery.refetch();
    summaryTransactionQuery.refetch();
    toast.success(message);
  };

  const baseParamsTransaction = useMemo<BaseParamsTransaction>(() => {
    return {
      fromDate: dayjs(activeMonth).toISOString(),
      toDate: dayjs(
        getNextMonth(dayjs(activeMonth).toISOString())
      ).toISOString(),
    };
  }, [activeMonth]);

  const paramsTransaction = useMemo<ParamsGetTransaction>(() => {
    return {
      ...baseParamsTransaction,
      keyword: debouncedKeyword,
      categoryId: category?.value,
    };
  }, [category, debouncedKeyword, baseParamsTransaction]);

  const transactionQuery = useQuery({
    queryKey: ["transaction", paramsTransaction],
    queryFn: () => getTransactionFn(paramsTransaction),
    staleTime: 100,
  });

  const summaryTransactionQuery = useQuery({
    queryKey: ["summary-transaction", baseParamsTransaction],
    queryFn: () => getSummaryTransactionFn(baseParamsTransaction),
    staleTime: 100,
  });

  const createTransactionMutation = useMutation({
    mutationFn: createTransactionFn,
    onSuccess: () => {
      successMutationHandler("Successfully add new transaction");
    },
  });

  const editTransactionMutation = useMutation({
    mutationFn: editTransactionFn,
    onSuccess: () => {
      successMutationHandler("Successfully update transaction");
    },
  });

  return {
    transactionQuery,
    summaryTransactionQuery,
    createTransactionMutation,
    editTransactionMutation,
  };
}
