import useWallet from "@/queries/useWallet";
import ToggleCurrency from "@/ui/toggle-currency";

export default function DisplayBalance() {
  const { summaryWalletQuery } = useWallet();

  return (
    <div className="flex items-center gap-3">
      <h1 className="font-bold text-2xl -mx-3">💲</h1>
      <div className="space-y-1">
        <h3 className="text-sm text-slate-600 font-medium leading-4">
          Total Balance
        </h3>
        <ToggleCurrency balance={summaryWalletQuery.data?.total_balance || 0} />
      </div>
    </div>
  );
}
