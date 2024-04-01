import { HttpResponse, getAuthConfig, http } from "@/lib/http";
import {
  SummaryWalletResponse,
  TFormWallet,
  WalletResponse,
  generatePayloadWallet,
} from "@/lib/wallet";
import { AxiosResponse } from "axios";

export const getSummaryWalletFn = async (): Promise<SummaryWalletResponse> => {
  const response: AxiosResponse<HttpResponse<SummaryWalletResponse>> =
    await http.get("/summaries/wallet", getAuthConfig());

  return response.data.data;
};

export const createWalletFn = async (
  form: TFormWallet
): Promise<WalletResponse> => {
  const response: AxiosResponse<HttpResponse<WalletResponse>> = await http.post(
    "/wallets",
    generatePayloadWallet(form),
    getAuthConfig()
  );

  return response.data.data;
};
