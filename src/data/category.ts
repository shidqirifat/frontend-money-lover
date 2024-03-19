export const SUBCATEGORIES = [
  {
    id: 1,
    name: "Bills and Utilities",
    masterCategoryTransaction: {
      id: 1,
      name: "Expense",
    },
    subCategories: [
      {
        id: 1,
        name: "Electricity Bill",
      },
      {
        id: 2,
        name: "Internet Bill",
      },
      {
        id: 3,
        name: "Phone Bill",
      },
    ],
  },
  {
    id: 2,
    name: "Food and Beverage",
    masterCategoryTransaction: {
      id: 1,
      name: "Expense",
    },
    subCategories: [
      {
        id: 4,
        name: "Cafe",
      },
      {
        id: 5,
        name: "Restaurant",
      },
    ],
  },
  {
    id: 3,
    name: "Family",
    masterCategoryTransaction: {
      id: 1,
      name: "Expense",
    },
    subCategories: [
      {
        id: 6,
        name: "Home Stock",
      },
      {
        id: 7,
        name: "Pets",
      },
    ],
  },
  {
    id: 4,
    name: "Health and Fitness",
    masterCategoryTransaction: {
      id: 1,
      name: "Expense",
    },
    subCategories: [
      {
        id: 8,
        name: "Doctor",
      },
      {
        id: 9,
        name: "Personal Care",
      },
    ],
  },
  {
    id: 5,
    name: "Sallary",
    masterCategoryTransaction: {
      id: 2,
      name: "Income",
    },
    subCategories: [],
  },
  {
    id: 6,
    name: "Side Hustle",
    masterCategoryTransaction: {
      id: 2,
      name: "Income",
    },
    subCategories: [],
  },
  {
    id: 7,
    name: "Other Income",
    masterCategoryTransaction: {
      id: 2,
      name: "Income",
    },
    subCategories: [],
  },
];

export const CATEGORIES = SUBCATEGORIES.map((item) => ({
  id: item.id,
  name: item.name,
}));
