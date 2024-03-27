import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowTopRightIcon, ExitIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import useAuth from "@/queries/useAuth";

const AuthAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="https://shidqirifat-portofolio.vercel.app/images/shidqi.png" />
      <AvatarFallback>SR</AvatarFallback>
    </Avatar>
  );
};

const AuthProfile = () => {
  const { authUserQuery } = useAuth();

  return (
    <div className="space-y-1">
      <h3 className="text-slate-700 font-semibold text-base leading-5">
        {authUserQuery.data?.data.name}
      </h3>
      <h4 className="text-slate-600 font-normal text-sm leading-4">
        {authUserQuery.data?.data.email}
      </h4>
      <button className="text-slate-600 hover:text-sky-500 transition font-normal text-xs leading-4 flex items-center">
        Edit account
        <ArrowTopRightIcon />
      </button>
    </div>
  );
};

const Logout = () => {
  const { logoutMutation } = useAuth();

  return (
    <div>
      <button
        onClick={() => logoutMutation.mutate()}
        className="h-full w-14 rounded flex flex-col justify-center items-center gap-2 bg-slate-200/50 hover:bg-slate-200 transition"
      >
        <ExitIcon width={14} height={14} />
        <span className="text-xs text-slate-700 font-normal text-center">
          Logout
        </span>
      </button>
    </div>
  );
};

export default function AuthUser() {
  return (
    <Popover>
      <PopoverTrigger>
        <AuthAvatar />
      </PopoverTrigger>
      <PopoverContent className="w-full" align="end" sideOffset={10}>
        <div className="flex gap-3">
          <AuthAvatar />
          <AuthProfile />
          <Separator orientation="vertical" className="min-h-16" />
          <Logout />
        </div>
      </PopoverContent>
    </Popover>
  );
}
