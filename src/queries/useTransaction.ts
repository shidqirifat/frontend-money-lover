import { getNextMonth } from "@/lib/date";
import {
  ParamsGetTransaction,
  getTransactionFn,
} from "@/services/transaction.service";
import useFilter from "@/stores/filter";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";

export default function useTransaction() {
  const { category, keyword } = useFilter();
  const [debouncedKeyword] = useDebouncedValue(keyword, 300);

  const paramsTransaction = useMemo<ParamsGetTransaction>(() => {
    return {
      fromDate: dayjs(dayjs().format("YYYY-MM-01")).toISOString(),
      toDate: dayjs(getNextMonth(dayjs().toISOString())).toISOString(),
      keyword: debouncedKeyword,
      categoryId: category?.value,
    };
  }, [category, debouncedKeyword]);

  const transactionQuery = useQuery({
    queryKey: ["transaction", category?.value, debouncedKeyword],
    queryFn: () => getTransactionFn(paramsTransaction),
  });

  return { transactionQuery };
}
