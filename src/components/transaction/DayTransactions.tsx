import { formatCurrency } from "@/lib/currency";
import { DayTransaction, TypeTransaction } from "@/lib/transaction";
import { cn } from "@/lib/utils";
import useModalTransaction from "@/stores/modalTransaction";
import dayjs from "dayjs";
import { BanknoteIcon, Wallet } from "lucide-react";

type DayTransactionsProps = { transactions: Array<DayTransaction> };
type HeaderDayTransactionProps = { dayTransaction: DayTransaction };

const Separator = () => <div className="h-8 bg-gray-100" />;

const HeaderDayTransaction = ({
  dayTransaction,
}: HeaderDayTransactionProps) => {
  const date = dayjs(dayTransaction.date);

  return (
    <div className="grid grid-cols-[2fr_10fr_5fr] items-center px-4 py-3 border-b border-slate-300">
      <h1 className="text-slate-600 font-medium text-3xl leading-6">
        {date.get("date")}
      </h1>
      <div className="space-y-0">
        <h3 className="text-slate-500 text-sm font-medium leading-5">
          {date.format("dddd")}
        </h3>
        <h4 className="text-slate-400 text-sm font-normal leading-5">
          {date.format("MMMM YYYY")}
        </h4>
      </div>
      <h2 className="text-slate-700 text-base font-semibold text-right leading-5">
        {dayTransaction.total_amount > 0 && "+"}
        {formatCurrency(dayTransaction.total_amount)}
      </h2>
    </div>
  );
};

const generateStyleCurrency = (masterCategoryId: number) => {
  return cn("text-right font-medium text-base leading-5", {
    "text-red-400": masterCategoryId === TypeTransaction.EXPENSE,
    "text-sky-400": masterCategoryId === TypeTransaction.INCOME,
  });
};

export default function DayTransactions({
  transactions,
}: DayTransactionsProps) {
  const { setTransaction } = useModalTransaction();

  return transactions.map((day) => (
    <div key={day.date}>
      <Separator />
      <HeaderDayTransaction dayTransaction={day} />
      <div>
        {day.transactions.map((transaction) => (
          <button
            key={transaction.id}
            onClick={() => setTransaction(transaction)}
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
                <h2 className="text-slate-700 font-medium leading-5 text-sm">
                  {transaction.sub_category
                    ? transaction.sub_category.name
                    : transaction.category.name}
                </h2>
                <h2
                  className={generateStyleCurrency(
                    transaction.master_category_transaction.id
                  )}
                >
                  {formatCurrency(transaction.amount)}
                </h2>
              </div>
              <h3 className="text-xs text-slate-500 font-normal leading-5 truncate max-w-[360px]">
                {transaction.description}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  ));
}
