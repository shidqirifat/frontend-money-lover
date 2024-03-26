import { AuthResponse, AuthError } from "@/lib/auth";
import {
  getAuthUserFn,
  loginUserFn,
  logoutUserFn,
  registerUserFn,
} from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const authUserQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUserFn,
    retry: false,
  });

  const handleSuccessAuth = ({ data }: AuthResponse) => {
    localStorage.setItem("token", data.token);
    router.push("/");
    toast.success(`Welcome ${data.name}!`);
  };

  const handleErrorAuth = (error: AxiosError<AuthError>) => {
    if (error.response?.status === 400) {
      toast.error(error.response.data.error.message);
    }
  };

  const registerMutation = useMutation({
    mutationFn: registerUserFn,
    onSuccess: handleSuccessAuth,
    onError: handleErrorAuth,
  });

  const loginMutation = useMutation({
    mutationFn: loginUserFn,
    onSuccess: handleSuccessAuth,
    onError: handleErrorAuth,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUserFn,
    onSuccess: () => {
      router.replace("/login");
      localStorage.removeItem("token");
      queryClient.invalidateQueries();
    },
  });

  return { authUserQuery, registerMutation, loginMutation, logoutMutation };
}