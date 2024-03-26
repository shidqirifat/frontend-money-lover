import { getCurrentMonth } from "@/lib/date";
import { create } from "zustand";

interface TabMonthState {
  activeMonth: string;
  setActiveMonth: (month: string) => void;
}

const useTabMonth = create<TabMonthState>((set) => ({
  activeMonth: getCurrentMonth(),
  setActiveMonth: (month: string) => set(() => ({ activeMonth: month })),
}));

export default useTabMonth;
