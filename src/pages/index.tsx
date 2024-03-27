import Summary from "@/components/transaction/Summary";
import TabMonths from "@/components/transaction/TabsMonths";
import NoTransaction from "@/components/transaction/NoTransaction";
import AuthLayout from "@/layouts/AuthLayout";
import DayTransactions from "@/components/transaction/DayTransactions";
import ModalAddTransaction from "@/components/transaction/ModalAddTransaction";
import ModalDetailTransaction from "@/components/transaction/ModalDetailTransaction";
import useTransaction from "@/queries/useTransaction";
import { toDayTransactions } from "@/lib/transaction";

export default function Home() {
  const { transactionQuery } = useTransaction();

  const noTransaction = transactionQuery.data?.length === 0;

  return (
    <AuthLayout>
      <main className="max-w-md mx-auto">
        <ModalAddTransaction />
        <ModalDetailTransaction />

        <div className="bg-white pt-2 rounded-md my-20 shadow-md">
          <TabMonths />

          {noTransaction ? <NoTransaction /> : <Summary />}

          <DayTransactions
            transactions={toDayTransactions(transactionQuery.data || [])}
          />
        </div>
      </main>
    </AuthLayout>
  );
}
