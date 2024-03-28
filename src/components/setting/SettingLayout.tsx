import { ReactNode } from "react";
import SettingNavigations from "./SettingNavigations";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ROUTES from "@/lib/route";

type SettingLayoutProps = {
  children: ReactNode;
};

export default function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <div className="max-w-5xl w-[90vw] mx-auto mt-20 bg-white">
      <div className="pt-8 pl-8">
        <Button variant="ghost" asChild>
          <Link href={ROUTES.HOME()} className="flex items-center gap-1">
            <ArrowLeft width={22} height={22} />
            <h4 className="leading-5 text-base">Back to home</h4>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-[1fr_2fr] bg-white rounded-md shadow-md">
        <SettingNavigations />
        <div className="p-12 pt-8">{children}</div>
      </div>
    </div>
  );
}
