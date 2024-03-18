import dayjs from "dayjs";

type Entity = {
  id: number;
  name: string;
};

export enum TypeTransaction {
  // eslint-disable-next-line no-unused-vars
  EXPENSE = 1,
  // eslint-disable-next-line no-unused-vars
  INCOME = 2,
}

export type Transaction = {
  id: number;
  amount: number;
  description: string;
  date: string;
  master_category_transaction: Entity;
  category: Entity;
  sub_category: Entity | null;
  wallet: Entity;
};

export type DayTransaction = {
  date: string;
  total_amount: number;
  transactions: Array<Transaction>;
};

export const toDayTransactions = (
  transactions: Array<Transaction>
): Array<DayTransaction> => {
  const dayTransactions: Array<DayTransaction> = [];

  for (const transaction of transactions) {
    const index = dayTransactions.findIndex(
      (day) => day.date === dayjs(transaction.date).format("YYYY-MM-DD")
    );
    const typeTransaction = transaction.master_category_transaction.id;

    if (index !== -1) {
      if (typeTransaction === TypeTransaction.EXPENSE) {
        dayTransactions[index].total_amount -= transaction.amount;
      } else dayTransactions[index].total_amount += transaction.amount;

      dayTransactions[index].transactions.push(transaction);
      continue;
    }

    const isExpense = typeTransaction === TypeTransaction.EXPENSE;
    const amount = isExpense ? -transaction.amount : transaction.amount;

    const newDay: DayTransaction = {
      date: dayjs(transaction.date).format("YYYY-MM-DD"),
      total_amount: amount,
      transactions: [transaction],
    };
    dayTransactions.push(newDay);
  }

  return dayTransactions;
};
