import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-blue-500 font-semibold text-2xl leading-6">
        Clone Money Lover
      </h1>
    </main>
  );
}
