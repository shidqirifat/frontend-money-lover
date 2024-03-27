import { getSubCategoriesFn } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useCategory() {
  const { data } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: getSubCategoriesFn,
    retry: false,
    staleTime: 200,
  });

  const categories = useMemo(() => {
    if (!data) return [];

    return data.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }, [data]);

  return { data, categories };
}
