import SettingLayout from "@/components/setting/SettingLayout";
import ModalAddWallet from "@/components/setting/wallet/ModalAddWallet";
import ModalUpdateWallet from "@/components/setting/wallet/ModalUpdateWallet";
import AuthLayout from "@/layouts/AuthLayout";
import { formatCurrency } from "@/lib/currency";
import useWallet from "@/queries/useWallet";
import useModalWallet from "@/stores/modalWallet";
import { WalletIcon } from "lucide-react";

type WalletCardProps = {
  name: string;
  balance: number;
  onClick: () => void;
};

const WalletCard = ({ name, balance, onClick }: WalletCardProps) => {
  return (
    <button
      onClick={onClick}
      className="border border-slate-100 hover:bg-slate-50 transition rounded shadow py-3 px-4 flex gap-4 w-full text-left"
    >
      <WalletIcon width={32} height={32} />
      <div className="space-y-1">
        <h2 className="text-slate-700 text-base font-medium leading-5">
          {name}
        </h2>
        <h3 className="text-slate-500 font-normal text-sm leading-5">
          {formatCurrency(balance)}
        </h3>
      </div>
    </button>
  );
};

export default function Wallets() {
  const { setWallet } = useModalWallet();
  const { summaryWalletQuery } = useWallet();

  return (
    <AuthLayout hideTransaction>
      <ModalUpdateWallet />

      <SettingLayout>
        <div className="flex justify-between items-center h-9">
          <h1 className="text-3xl text-green-500 font-bold leading-7">
            My Wallets
          </h1>

          <ModalAddWallet />
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-3">
          {summaryWalletQuery.data?.wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              {...wallet}
              onClick={() => setWallet(wallet)}
            />
          ))}
        </div>
      </SettingLayout>
    </AuthLayout>
  );
}
