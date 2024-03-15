import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

type AuthLayoutProps = { children: ReactNode };

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={inter.className}>
      <Header />
      <main className="max-w-md mx-auto">{children}</main>
    </div>
  );
}
