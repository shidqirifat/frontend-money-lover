import useAuth from "@/queries/useAuth";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type AuthLayoutProps = { children: ReactNode };

export default function NotAuthLayout({ children }: AuthLayoutProps) {
  const { authUserQuery } = useAuth();
  const router = useRouter();

  useEffect(() => {
    authUserQuery.refetch();
  }, []);

  if (authUserQuery.isPending) return null;
  else if (authUserQuery.isSuccess) router.push("/");
  else if (authUserQuery.isError) return <div>{children}</div>;
}
