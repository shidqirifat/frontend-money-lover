import { getNextMonth } from "@/lib/date";
import {
  BaseParamsTransaction,
  ParamsGetTransaction,
  getSummaryTransactionFn,
  getTransactionFn,
} from "@/services/transaction.service";
import useFilter from "@/stores/filter";
import useTabMonth from "@/stores/tabMonth";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";

export default function useTransaction() {
  const { category, keyword } = useFilter();
  const [debouncedKeyword] = useDebouncedValue(keyword, 300);
  const { activeMonth } = useTabMonth();

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
  });

  const summaryTransactionQuery = useQuery({
    queryKey: ["summary-transaction", baseParamsTransaction],
    queryFn: () => getSummaryTransactionFn(baseParamsTransaction),
  });

  return { transactionQuery, summaryTransactionQuery };
}
