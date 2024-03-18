export const TRANSACTIONS = [
  {
    id: 1,
    amount: 10000,
    description: "Jajan",
    date: "2024-03-11T10:48:00.000Z",
    master_category_transaction: {
      id: 1,
      name: "Expense",
    },
    category: {
      id: 1,
      name: "Bills and Utilities",
    },
    sub_category: {
      id: 1,
      name: "Electricity Bill",
    },
    wallet: {
      id: 1,
      name: "Cash",
    },
  },
  {
    id: 3,
    amount: 20000,
    description: "Makan mie ayam",
    date: "2024-03-18T14:48:00.000Z",
    master_category_transaction: {
      id: 1,
      name: "Expense",
    },
    category: {
      id: 2,
      name: "Food and Beverage",
    },
    sub_category: {
      id: 5,
      name: "Restaurant",
    },
    wallet: {
      id: 1,
      name: "Cash",
    },
  },
  {
    id: 5,
    amount: 1000000,
    description: "Gaji bulanan",
    date: "2024-03-18T14:48:00.000Z",
    master_category_transaction: {
      id: 2,
      name: "Income",
    },
    category: {
      id: 5,
      name: "Sallary",
    },
    sub_category: null,
    wallet: {
      id: 1,
      name: "Cash",
    },
  },
];
