import { HttpResponse, getAuthConfig, http } from "@/lib/http";
import { Transaction } from "@/lib/transaction";
import { AxiosResponse } from "axios";

export type ParamsGetTransaction = {
  fromDate: string;
  toDate: string;
  keyword?: string;
  fromAmout?: number;
  toAmout?: number;
  categoryId?: number;
  walletId?: number;
};

export const getTransactionFn = async (
  params: ParamsGetTransaction
): Promise<Transaction[]> => {
  const response: AxiosResponse<HttpResponse<Transaction[]>> = await http.get(
    "/transactions",
    getAuthConfig({ params })
  );

  return response.data.data;
};
