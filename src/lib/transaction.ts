import dayjs from "dayjs";
import { z } from "zod";
import { toDatalist } from "./datalist";
import { WALLETS } from "@/data/wallet";

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

const generateOptionSchema = (params?: z.RawCreateParams) => {
  return z.object({ label: z.string(), value: z.number() }, params);
};

export const formTransactionSchema = z.object({
  amount: z
    .string()
    .regex(/^[\d.]+$/, {
      message: "Only numbers is allowed.",
    })
    .refine((value) => value !== "0", { message: "Amount cannot be zero" }),
  description: z.string(),
  date: z.string().datetime(),
  wallet: generateOptionSchema(),
  category: generateOptionSchema({ required_error: "Category is required" }),
  subCategory: generateOptionSchema().nullable(),
});

export type TFormTransaction = z.infer<typeof formTransactionSchema>;

export const generateDefaultValueFormTransaction =
  (): Partial<TFormTransaction> => {
    return {
      amount: "0",
      description: "",
      date: dayjs().toISOString(),
      wallet: toDatalist(WALLETS)[0],
      subCategory: null,
    };
  };
