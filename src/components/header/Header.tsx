import { CATEGORIES } from "@/data/category";
import DisplayBalance from "./DisplayBalance";
import { Button } from "@/ui/button";
import { Combobox, Option } from "@/ui/combobox";
import { InputSearch } from "@/ui/input-search";
import { Logo } from "@/ui/logo";
import { Separator } from "@/ui/separator";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

type ClearCategoryProps = { onClick: () => void };

const ClearCategory = ({ onClick }: ClearCategoryProps) => {
  return (
    <Button
      variant="destructive"
      className="h-6 w-6 p-0 rounded-full"
      onClick={onClick}
    >
      <Cross1Icon className="h-3 w-3" color="white" />
    </Button>
  );
};

export default function Header() {
  const [category, setCategory] = useState<Option>(null);
  const [keyword, setKeyword] = useState("");

  const clearCategory = () => setCategory(null);

  return (
    <header className="py-4 px-6 flex justify-between items-center bg-white shadow">
      <div className="flex items-center gap-3">
        <Logo />
        <Separator orientation="vertical" className="h-9" />
        <DisplayBalance balance={20_000_000} />
      </div>

      <div className="flex items-center gap-2 w-max">
        {category && <ClearCategory onClick={clearCategory} />}
        <Combobox
          options={CATEGORIES}
          selected={category}
          onChange={setCategory}
          placeholder="Select category"
        />
        <InputSearch
          placeholder="Search transaction..."
          className="w-56 text-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </header>
  );
}
