import { HttpResponse, getAuthConfig, http } from "@/lib/http";
import {
  SummaryTransactionResponse,
  TFormTransaction,
  Transaction,
  generatePayloadTransaction,
} from "@/lib/transaction";
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

type editTransactionFnArg = {
  payload: TFormTransaction;
  id: number;
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

export const getSummaryTransactionFn = async (
  params: BaseParamsTransaction
): Promise<SummaryTransactionResponse> => {
  const response: AxiosResponse<HttpResponse<SummaryTransactionResponse>> =
    await http.get("/summaries/transaction", getAuthConfig({ params }));

  return response.data.data;
};

export const createTransactionFn = async (
  payload: TFormTransaction
): Promise<Transaction[]> => {
  const response: AxiosResponse<HttpResponse<Transaction[]>> = await http.post(
    "/transactions",
    generatePayloadTransaction(payload),
    getAuthConfig()
  );

  return response.data.data;
};

export const editTransactionFn = async ({
  payload,
  id,
}: editTransactionFnArg): Promise<Transaction[]> => {
  const response: AxiosResponse<HttpResponse<Transaction[]>> = await http.put(
    `/transactions/${id}`,
    generatePayloadTransaction(payload),
    getAuthConfig()
  );

  return response.data.data;
};

export const deleteTransactionFn = async (id: number) => {
  await http.delete(`/transactions/${id}`, getAuthConfig());
};
