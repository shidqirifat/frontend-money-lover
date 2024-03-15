import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

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
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center justify-between">
        <Label>Inflow</Label>
        <Value type="inflow">{`Rp ${formatCurrency(6_000_000)}`}</Value>
      </div>
      <div className="flex items-center justify-between">
        <Label>Outflow</Label>
        <Value type="outflow">{`-Rp ${formatCurrency(2_000_000)}`}</Value>
      </div>
      <div className="ml-auto border-t border-slate-300 pt-1 w-36">
        <h2 className="text-slate-600 text-right text-base font-medium leading-5">
          {`+Rp ${formatCurrency(4_000_000)}`}
        </h2>
      </div>
    </div>
  );
}
