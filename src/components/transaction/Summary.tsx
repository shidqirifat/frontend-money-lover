import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import useTransaction from "@/queries/useTransaction";
import { useMemo } from "react";

type LabelProps = { children: string };
type ValueProps = { type: "inflow" | "outflow"; children: string };

const Label = ({ children }: LabelProps) => {
  return (
    <h2 className="text-slate-700 text-sm font-normal leading-5">{children}</h2>
  );
};

const Value = ({ children, type }: ValueProps) => {
  return (
    <h2
      className={cn("text-sm font-medium leading-5", {
        "text-sky-400": type === "inflow",
        "text-red-400": type === "outflow",
      })}
    >
      {children}
    </h2>
  );
};

export default function Summary() {
  const { summaryTransactionQuery } = useTransaction();

  const isProfit = useMemo(() => {
    return (summaryTransactionQuery.data?.net_income || 0) > 0;
  }, [summaryTransactionQuery.data?.net_income]);

  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center justify-between">
        <Label>Inflow</Label>
        <Value type="inflow">
          {formatCurrency(summaryTransactionQuery.data?.income || 0)}
        </Value>
      </div>
      <div className="flex items-center justify-between">
        <Label>Outflow</Label>
        <Value type="outflow">
          {formatCurrency(summaryTransactionQuery.data?.expense || 0)}
        </Value>
      </div>
      <div className="ml-auto border-t border-slate-300 pt-1 w-36">
        <h2 className="text-slate-600 text-right text-base font-medium leading-5">
          {isProfit ? "+" : "-"}
          {formatCurrency(summaryTransactionQuery.data?.net_income || 0, true)}
        </h2>
      </div>
    </div>
  );
}
