import Summary from "@/components/transaction/Summary";
import TabMonths from "@/components/transaction/TabsMonths";
import NoTransaction from "@/components/transaction/empty";
import { TRANSACTIONS } from "@/data/transaction";
import AuthLayout from "@/layouts/AuthLayout";
import { formatCurrency } from "@/lib/currency";
import { TypeTransaction, toDayTransactions } from "@/lib/transaction";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { BanknoteIcon, Wallet } from "lucide-react";

export default function Home() {
  const noTransaction = false;
  const dayTransactions = toDayTransactions(TRANSACTIONS);

  return (
    <AuthLayout>
      <div className="bg-white pt-2 rounded-md mt-20 shadow-md">
        <TabMonths />

        {noTransaction ? <NoTransaction /> : <Summary />}

        {dayTransactions.map((day) => (
          <div key={day.date}>
            <div className="h-8 bg-gray-100" />
            <div>
              <div className="grid grid-cols-[2fr_10fr_5fr] items-center px-4 py-3 border-b border-slate-300">
                <h1 className="text-slate-600 font-medium text-3xl leading-6">
                  {dayjs(day.date).get("date")}
                </h1>
                <div className="space-y-0">
                  <h3 className="text-slate-500 text-sm font-medium leading-5">
                    {dayjs(day.date).format("dddd")}
                  </h3>
                  <h4 className="text-slate-400 text-sm font-normal leading-5">
                    {dayjs(day.date).format("MMMM YYYY")}
                  </h4>
                </div>
                <h2 className="text-slate-700 text-base font-semibold text-right leading-5">
                  {day.total_amount > 0 && "+"}
                  {formatCurrency(day.total_amount)}
                </h2>
              </div>

              {day.transactions.map((transaction) => (
                <button
                  key={transaction.id}
                  className="grid grid-cols-[2fr_15fr] w-full text-left items-center px-4 py-3 hover:bg-green-500/10 transition"
                >
                  <div className="rounded-full h-8 w-8 relative bg-green-500 grid place-content-center">
                    <BanknoteIcon width={22} height={22} color="yellow" />
                    <Wallet
                      width={14}
                      height={14}
                      color="red"
                      className="absolute right-0 -bottom-1"
                    />
                  </div>

                  <div>
                    <div className="grid grid-cols-[1fr_120px]">
                      <h2 className="text-slate-700 font-medium leading-5 text-base">
                        {transaction.sub_category
                          ? transaction.sub_category.name
                          : transaction.category.name}
                      </h2>
                      <h2
                        className={cn(
                          "text-right font-medium text-base leading-5",
                          {
                            "text-red-400":
                              transaction.master_category_transaction.id ===
                              TypeTransaction.EXPENSE,
                            "text-sky-400":
                              transaction.master_category_transaction.id ===
                              TypeTransaction.INCOME,
                          }
                        )}
                      >
                        {formatCurrency(transaction.amount)}
                      </h2>
                    </div>
                    <h3 className="text-sm text-slate-500 font-normal leading-5 truncate max-w-[360px]">
                      {transaction.description}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AuthLayout>
  );
}
