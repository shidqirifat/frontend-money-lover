import { ReactNode } from "react";
import SettingNavigations from "./SettingNavigations";

type SettingLayoutProps = {
  children: ReactNode;
};

export default function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <div className="max-w-5xl w-[90vw] mx-auto grid grid-cols-[1fr_2fr] mt-20 bg-white rounded-md shadow-md">
      <SettingNavigations />
      <div className="p-12">{children}</div>
    </div>
  );
}
