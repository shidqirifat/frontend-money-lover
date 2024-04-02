import { toDatalist } from "./datalist";

type Entity = {
  id: number;
  name: string;
};

export interface SubCategoryResponse extends Entity {
  masterCategoryTransaction: Entity;
  subCategories: Array<Entity>;
}

type CategoryOption = {
  label: string;
  value: number;
};

export const getSubCategoriesByCategory = (
  category: CategoryOption,
  data: Array<SubCategoryResponse> | undefined
) => {
  if (!category) return [];

  const subCategoriesSelected = data?.find(
    (item) => item.id === category.value
  )?.subCategories;

  if (!subCategoriesSelected || subCategoriesSelected.length === 0) return [];

  return toDatalist(subCategoriesSelected);
};

export type TypeTransactionData = Array<{
  id: number;
  name: string;
  categories: Array<{
    id: number;
    name: string;
    subCategories: Array<{
      id: number;
      name: string;
    }>;
  }>;
}>;
