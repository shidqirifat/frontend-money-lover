import Summary from "@/components/transaction/Summary";
import TabMonths from "@/components/transaction/TabsMonths";
import NoTransaction from "@/components/transaction/NoTransaction";
import { TRANSACTIONS } from "@/data/transaction";
import AuthLayout from "@/layouts/AuthLayout";
import { toDayTransactions } from "@/lib/transaction";
import DayTransactions from "@/components/transaction/DayTransactions";
import { useMemo } from "react";
import useFilter from "@/stores/filter";
import { useDebouncedValue } from "@mantine/hooks";

export default function Home() {
  const { category, keyword } = useFilter();
  const [debouncedKeyword] = useDebouncedValue(keyword, 300);

  const dayTransactions = useMemo(() => {
    const filteredTransactions = TRANSACTIONS.filter((transaction) => {
      const description = transaction.description.toLowerCase();
      if (description.includes(debouncedKeyword.toLowerCase())) {
        if (!category) return true;
        return transaction.category.id === Number(category.value);
      }
    });

    return toDayTransactions(filteredTransactions);
  }, [category, debouncedKeyword]);

  const noTransaction = false;

  return (
    <AuthLayout>
      <div className="bg-white pt-2 rounded-md my-20 shadow-md">
        <TabMonths />

        {noTransaction ? <NoTransaction /> : <Summary />}

        <DayTransactions transactions={dayTransactions} />
      </div>
    </AuthLayout>
  );
}
