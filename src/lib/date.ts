import dayjs from "dayjs";

export const getCurrentMonth = () => {
  return dayjs().startOf("month").toISOString();
};

export const getPrevMonth = (currMonth: string, total = 1) => {
  return dayjs(currMonth)
    .subtract(total, "month")
    .startOf("month")
    .toISOString();
};

export const getNextMonth = (currMonth: string, total = 1) => {
  return dayjs(currMonth).add(total, "month").startOf("month").toISOString();
};
