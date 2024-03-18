import Summary from "@/components/transaction/Summary";
import TabMonths from "@/components/transaction/TabsMonths";
import NoTransaction from "@/components/transaction/NoTransaction";
import { TRANSACTIONS } from "@/data/transaction";
import AuthLayout from "@/layouts/AuthLayout";
import { toDayTransactions } from "@/lib/transaction";
import DayTransactions from "@/components/transaction/DayTransactions";

export default function Home() {
  const noTransaction = false;
  const dayTransactions = toDayTransactions(TRANSACTIONS);

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
