import { AuthResponse, AuthError } from "@/lib/auth";
import {
  getAuthUserFn,
  loginUserFn,
  registerUserFn,
} from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useAuth() {
  const router = useRouter();

  const authUserQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUserFn,
  });

  const handleSuccess = ({ data }: AuthResponse) => {
    localStorage.setItem("token", data.token);
    router.push("/");
    toast.success(`Welcome ${data.name}!`);
  };

  const handleError = (error: AxiosError<AuthError>) => {
    if (error.response?.status === 400) {
      toast.error(error.response.data.error.message);
    }
  };

  const registerMutation = useMutation({
    mutationFn: registerUserFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const loginMutation = useMutation({
    mutationFn: loginUserFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return { authUserQuery, registerMutation, loginMutation };
}
