import { SubCategoryResponse } from "@/lib/category";
import { HttpResponse, getAuthConfig, http } from "@/lib/http";
import { AxiosResponse } from "axios";

export const getSubCategoriesFn = async (): Promise<
  Array<SubCategoryResponse>
> => {
  const response: AxiosResponse<HttpResponse<Array<SubCategoryResponse>>> =
    await http.get("/sub-categories", getAuthConfig());

  return response.data.data;
};
