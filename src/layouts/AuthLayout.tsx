import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import { ReactNode, useEffect } from "react";
import useAuth from "@/queries/useAuth";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

type AuthLayoutProps = { children: ReactNode };

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { authUserQuery } = useAuth();
  const router = useRouter();

  useEffect(() => {
    authUserQuery.refetch();
  }, []);

  if (authUserQuery.isPending) return null;
  else if (authUserQuery.isError) router.push("/login");
  else if (authUserQuery.isSuccess) {
    return (
      <div className={inter.className}>
        <Header />
        <main className="max-w-md mx-auto">{children}</main>
      </div>
    );
  }
}
