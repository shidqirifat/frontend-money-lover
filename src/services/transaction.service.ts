import { HttpResponse, getAuthConfig, http } from "@/lib/http";
import { SummaryTransactionResponse, Transaction } from "@/lib/transaction";
import { AxiosResponse } from "axios";

export type BaseParamsTransaction = {
  fromDate: string;
  toDate: string;
};

export interface ParamsGetTransaction extends BaseParamsTransaction {
  keyword?: string;
  fromAmout?: number;
  toAmout?: number;
  categoryId?: number;
  walletId?: number;
}

export const getTransactionFn = async (
  params: ParamsGetTransaction
): Promise<Transaction[]> => {
  const response: AxiosResponse<HttpResponse<Transaction[]>> = await http.get(
    "/transactions",
    getAuthConfig({ params })
  );

  return response.data.data;
};

export const getSummaryTransactionFn = async (
  params: BaseParamsTransaction
): Promise<SummaryTransactionResponse> => {
  const response: AxiosResponse<HttpResponse<SummaryTransactionResponse>> =
    await http.get("/summaries/transaction", getAuthConfig({ params }));

  return response.data.data;
};
