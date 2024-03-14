import ToggleCurrency from "@/ui/toggle-currency";

type DisplayBalanceProps = { balance: number };

export default function DisplayBalance({ balance }: DisplayBalanceProps) {
  return (
    <div className="flex items-center gap-3">
      <h1 className="font-bold text-2xl -mx-3">💲</h1>
      <div className="space-y-1">
        <h3 className="text-sm text-slate-600 font-medium leading-4">
          Total Balance
        </h3>
        <ToggleCurrency balance={balance} />
      </div>
    </div>
  );
}
