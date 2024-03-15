import AuthLayout from "@/layouts/AuthLayout";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

type TabMonthProps = {
  children: string;
  active: boolean;
  onClick?: () => void;
};

const TabMonth = ({ children, active, onClick }: TabMonthProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("py-3 px-4 text-sm hover:bg-slate-50/70 transition", {
        "text-green-500 font-semibold border-b-2 border-b-green-500": active,
        "text-slate-600 font-medium": !active,
      })}
    >
      {children}
    </button>
  );
};

const getCurrentMonth = () => dayjs().format("YYYY-MM-DD");

const getPrevMonth = (currMonth: string, total = 1) => {
  return dayjs(currMonth).subtract(total, "month").format("YYYY-MM-DD");
};

const getNextMonth = (currMonth: string, total = 1) => {
  return dayjs(currMonth).add(total, "month").format("YYYY-MM-DD");
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

export default function Home() {
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
    <AuthLayout>
      <div className="bg-white pt-2 rounded-md mt-20">
        <div className="grid grid-cols-3 border-b border-slate-200">
          {!isFuture ? (
            <>
              <TabMonth
                active={false}
                onClick={() => setActiveMonth(prevMonth)}
              >
                {generateTextMonth(prevMonth)}
              </TabMonth>
              <TabMonth active onClick={() => setActiveMonth(activeMonth)}>
                {generateTextMonth(activeMonth)}
              </TabMonth>
              <TabMonth
                active={false}
                onClick={() => setActiveMonth(nextMonth)}
              >
                {generateTextMonth(nextMonth)}
              </TabMonth>
            </>
          ) : (
            <>
              <TabMonth
                active={false}
                onClick={() => setActiveMonth(getPrevMonth(activeMonth, 2))}
              >
                LAST MONTH
              </TabMonth>
              <TabMonth
                active={false}
                onClick={() => setActiveMonth(prevMonth)}
              >
                THIS MONTH
              </TabMonth>
              <TabMonth active>FUTURE</TabMonth>
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
