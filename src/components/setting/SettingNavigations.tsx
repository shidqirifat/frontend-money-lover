import ROUTES from "@/lib/route";
import { cn } from "@/lib/utils";
import { LucideIcon, Settings, Tags, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

type NavigationProps = {
  children: string;
  icon: LucideIcon;
  url: string;
};

const Navigation = ({ children, icon, url }: NavigationProps) => {
  const Icon = icon;
  const router = useRouter();
  const active = router.pathname === url;

  return (
    <Link href={url}>
      <div
        className={cn("py-2 px-4 transition rounded flex items-center gap-2", {
          "text-green-500 bg-green-50 hover:bg-green-100": active,
          "hover:bg-slate-50": !active,
        })}
      >
        <Icon width={24} height={24} />
        <h3
          className={cn("text-base leading-5", {
            "font-medium text-green-500": active,
            "font-normal text-slate-700": !active,
          })}
        >
          {children}
        </h3>
      </div>
    </Link>
  );
};

export default function SettingNavigations() {
  return (
    <div className="p-12 pr-6 pt-8 border-r border-slate-100">
      <div className="flex items-center gap-2">
        <Settings width={28} height={28} />
        <h1 className="text-slate-600 font-semibold text-2xl leading-6">
          Settings
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-2 relative -left-3">
        <Navigation url={ROUTES.SETTING_CATEGORY()} icon={Tags}>
          Category
        </Navigation>
        <Navigation url={ROUTES.SETTING_WALLET()} icon={Wallet}>
          Wallet
        </Navigation>
        <Navigation url={ROUTES.SETTING_PROFILE()} icon={User}>
          Profile
        </Navigation>
      </div>
    </div>
  );
}
