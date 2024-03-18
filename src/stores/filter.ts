import { create } from "zustand";
import { Option } from "@/components/ui/combobox";

interface FilterState {
  category: Option | null;
  keyword: string;
  setCategory: (category: Option) => void;
  clearCategory: () => void;
  setKeyword: (keyword: string) => void;
}

const useFilter = create<FilterState>((set) => ({
  category: null,
  keyword: "",
  setCategory: (category: Option) => set(() => ({ category })),
  clearCategory: () => set(() => ({ category: null })),
  setKeyword: (keyword: string) => set(() => ({ keyword })),
}));

export default useFilter;
