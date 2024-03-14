import { Button } from "@/components/ui/button";
import { Combobox, Option } from "@/components/ui/combobox";
import { InputSearch } from "@/components/ui/input-search";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Cross1Icon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const CATEGORIES = [
  {
    label: "Bills and Utilities",
    value: "1",
  },
  {
    label: "Food and Beverage",
    value: "2",
  },
  {
    label: "Family",
    value: "3",
  },
  {
    label: "Sallary",
    value: "4",
  },
  {
    label: "Side Hustle",
    value: "5",
  },
];

export default function Home() {
  const [category, setCategory] = useState<Option>(null);
  const [hideBalance, setHideBalance] = useState(true);

  const clearCategory = () => setCategory(null);

  const toggleHideBalance = () => setHideBalance((prev) => !prev);

  return (
    <div className={inter.className}>
      <header className="py-4 px-6 flex justify-between items-center bg-white shadow">
        <div className="flex items-center gap-3">
          <h1 className="text-slate-700 font-semibold text-lg leading-6">
            Money Lover App
          </h1>
          <Separator orientation="vertical" className="h-9" />
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-2xl -mx-3">💲</h1>
            <div className="space-y-1">
              <h3 className="text-xs text-slate-600 font-medium leading-4">
                Total Balance
              </h3>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-green-600 leading-5">
                  Rp {hideBalance ? "*".repeat(10) : "50.000.000"}
                </h2>
                <Toggle
                  onClick={toggleHideBalance}
                  aria-label="Toggle italic"
                  className="h-8 w-8 p-0 rounded-full"
                >
                  {hideBalance ? (
                    <EyeClosedIcon className="h-5 w-5" color="grey" />
                  ) : (
                    <EyeOpenIcon className="h-5 w-5" color="grey" />
                  )}
                </Toggle>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-max">
          {category && (
            <Button
              variant="destructive"
              className="h-6 w-6 p-0 rounded-full"
              onClick={clearCategory}
            >
              <Cross1Icon className="h-3 w-3" color="white" />
            </Button>
          )}
          <Combobox
            options={CATEGORIES}
            selected={category}
            onChange={setCategory}
            placeholder="Select category"
          />
          <InputSearch
            placeholder="Search transaction..."
            className="w-56 text-sm"
          />
        </div>
      </header>
    </div>
  );
}
