import { getNextMonth } from "@/lib/date";
import {
  ParamsGetTransaction,
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

  const paramsTransaction = useMemo<ParamsGetTransaction>(() => {
    return {
      fromDate: dayjs(activeMonth).toISOString(),
      toDate: dayjs(
        getNextMonth(dayjs(activeMonth).toISOString())
      ).toISOString(),
      keyword: debouncedKeyword,
      categoryId: category?.value,
    };
  }, [category, debouncedKeyword, activeMonth]);

  const transactionQuery = useQuery({
    queryKey: ["transaction", paramsTransaction],
    queryFn: () => getTransactionFn(paramsTransaction),
  });

  return { transactionQuery };
}
