import { getCurrentMonth, getNextMonth, getPrevMonth } from "@/lib/date";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

type TabMonthProps = {
  children: string;
  active?: boolean;
  onClick?: () => void;
};

const TabMonth = ({ children, active, onClick }: TabMonthProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-3 px-4 text-sm rounded-t-md hover:bg-slate-50/70 transition",
        {
          "text-green-500 font-semibold border-b-2 border-b-green-500": active,
          "text-slate-600 font-medium": !active,
        }
      )}
    >
      {children}
    </button>
  );
};

const generateTextMonth = (month: string) => {
  const selectedMonth = dayjs(month);
  const currentMonth = dayjs();
  const totalDiffMonth = currentMonth.diff(selectedMonth, "month");

  if (totalDiffMonth === 0) {
    if (currentMonth.isBefore(selectedMonth)) return "FUTURE";
    return "THIS MONTH";
  }
  if (totalDiffMonth === 1) return "LAST MONTH";
  return selectedMonth.format("MM-YYYY");
};

export default function TabMonths() {
  const [activeMonth, setActiveMonth] = useState(getCurrentMonth());
  const [prevMonth, setPrevMonth] = useState("");
  const [nextMonth, setNextMonth] = useState("");

  useEffect(() => {
    setPrevMonth(getPrevMonth(activeMonth));
    setNextMonth(getNextMonth(activeMonth));
  }, [activeMonth]);

  const isFuture = useMemo(
    () => dayjs(activeMonth).isAfter(dayjs()),
    [activeMonth]
  );

  return (
    <div className="grid grid-cols-3 border-b border-slate-200">
      {!isFuture ? (
        <>
          <TabMonth onClick={() => setActiveMonth(prevMonth)}>
            {generateTextMonth(prevMonth)}
          </TabMonth>
          <TabMonth active onClick={() => setActiveMonth(activeMonth)}>
            {generateTextMonth(activeMonth)}
          </TabMonth>
          <TabMonth onClick={() => setActiveMonth(nextMonth)}>
            {generateTextMonth(nextMonth)}
          </TabMonth>
        </>
      ) : (
        <>
          <TabMonth
            onClick={() => setActiveMonth(getPrevMonth(activeMonth, 2))}
          >
            LAST MONTH
          </TabMonth>
          <TabMonth onClick={() => setActiveMonth(prevMonth)}>
            THIS MONTH
          </TabMonth>
          <TabMonth active>FUTURE</TabMonth>
        </>
      )}
    </div>
  );
}
