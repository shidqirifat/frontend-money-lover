import { HttpResponse, getAuthConfig, http } from "@/lib/http";
import { SummaryWalletResponse } from "@/lib/wallet";
import { AxiosResponse } from "axios";

export const getSummaryWalletFn = async (): Promise<SummaryWalletResponse> => {
  const response: AxiosResponse<HttpResponse<SummaryWalletResponse>> =
    await http.get("/summaries/wallet", getAuthConfig());

  return response.data.data;
};