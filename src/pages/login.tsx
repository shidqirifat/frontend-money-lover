import FormLogin from "@/components/auth/FormLogin";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <div className="bg-green-700 h-[30vh] relative">
        <div className="scale-[2] absolute top-[40%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
          <Logo />
        </div>
      </div>
      <div className="bg-white max-w-sm w-[90vw] mx-auto relative -top-14 py-8 px-6 rounded-lg">
        <h1 className="text-2xl font-bold text-black leading-6 text-center">
          Log In
        </h1>

        <FormLogin />

        <div className="mt-4">
          <h3 className="text-slate-700 text-sm leading-5 font-normal">
            Don`t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-2 text-sky-500"
            >
              Register
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
