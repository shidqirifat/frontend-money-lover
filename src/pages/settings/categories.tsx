import SettingLayout from "@/components/setting/SettingLayout";
import CategoryCard from "@/components/setting/category/CategoryCard";
import ModalUpdateWallet from "@/components/setting/wallet/ModalUpdateWallet";
import AuthLayout from "@/layouts/AuthLayout";
import { TypeTransactionData } from "@/lib/category";
import { TypeTransaction } from "@/lib/transaction";
import { cn } from "@/lib/utils";
import useCategory from "@/queries/useCategory";
import { useMemo } from "react";

export default function Categories() {
  const { subCategoriesData } = useCategory();

  const typeTransaction = useMemo(() => {
    if (!subCategoriesData) return [];

    const data: TypeTransactionData = [];
    for (const category of subCategoriesData) {
      const type = category.masterCategoryTransaction;
      const index = data.findIndex((item) => item.id === type.id);
      const newCategory = {
        id: category.id,
        name: category.name,
        subCategories: category.subCategories,
      };

      if (index !== -1) data[index].categories.push(newCategory);
      else {
        data.push({
          id: type.id,
          name: type.name,
          categories: [newCategory],
        });
      }
    }

    return data;
  }, [subCategoriesData]);

  return (
    <AuthLayout hideTransaction>
      <ModalUpdateWallet />

      <SettingLayout>
        <div className="flex justify-between items-center h-9">
          <h1 className="text-3xl text-green-500 font-bold leading-7">
            My Categories
          </h1>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {typeTransaction.map((type) => (
            <div key={type.id}>
              <h2
                className={cn("font-semibold text-xl leading-5 uppercase", {
                  "text-red-500": type.id === TypeTransaction.EXPENSE,
                  "text-sky-500": type.id === TypeTransaction.INCOME,
                })}
              >
                {type.name}
              </h2>
              <div className="mt-3 space-y-3">
                {type.categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    title={category.name}
                    subCategories={category.subCategories}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SettingLayout>
    </AuthLayout>
  );
}
