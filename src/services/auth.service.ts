import { AuthResponse, TFormRegister } from "@/lib/auth";
import { getAuthConfig, http } from "@/lib/http";
import { AxiosResponse } from "axios";

export const registerUserFn = async (
  data: TFormRegister
): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await http.post(
    "/auth/register",
    {
      name: data.name,
      email: data.email,
      password: data.password,
    }
  );

  return response.data;
};

export const getAuthUserFn = async (): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await http.get(
    "/auth",
    getAuthConfig()
  );

  return response.data;
};
