import { formatCurrency } from "@/lib/currency";
import { Toggle } from "@/components/ui/toggle";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type ToggleCurrencyProps = { balance: number };
type ToggleEyeIconProps = { hide: boolean };

const ToggleEyeIcon = ({ hide }: ToggleEyeIconProps) => {
  const EyeIcon = hide ? EyeClosedIcon : EyeOpenIcon;

  return <EyeIcon className="h-5 w-5" color="grey" />;
};

export default function ToggleCurrency({ balance }: ToggleCurrencyProps) {
  const [hideBalance, setHideBalance] = useState(true);

  const toggleHideBalance = () => setHideBalance((prev) => !prev);

  return (
    <div className="flex items-center gap-2">
      <h2 className="font-bold text-base text-green-500 leading-5">
        Rp {hideBalance ? "*".repeat(10) : formatCurrency(balance)}
      </h2>
      <Toggle
        onClick={toggleHideBalance}
        aria-label="Toggle italic"
        className="h-8 w-8 p-0 rounded-full"
      >
        <ToggleEyeIcon hide={hideBalance} />
      </Toggle>
    </div>
  );
}
