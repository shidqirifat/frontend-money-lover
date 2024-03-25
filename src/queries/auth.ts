import { AuthResponse, RegisterError } from "@/lib/auth";
import { getAuthUserFn, registerUserFn } from "@/services/auth.service";
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

  const registerMutation = useMutation({
    mutationFn: registerUserFn,
    onSuccess: ({data}: AuthResponse) => {
      localStorage.setItem("token", data.token);
      router.push("/");
      toast.success(`Welcome ${data.name}!`);
    },
    onError: (error: AxiosError<RegisterError>) => {
      if (error.response?.status === 400) {
        toast.error(error.response.data.error.message)
      }
    },
  });

  return { authUserQuery, registerMutation };
}
