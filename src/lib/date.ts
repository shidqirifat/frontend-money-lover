import dayjs from "dayjs";

export const getCurrentMonth = () => dayjs().format("YYYY-MM-DD");

export const getPrevMonth = (currMonth: string, total = 1) => {
  return dayjs(currMonth).subtract(total, "month").format("YYYY-MM-01");
};

export const getNextMonth = (currMonth: string, total = 1) => {
  return dayjs(currMonth).add(total, "month").format("YYYY-MM-01");
};
