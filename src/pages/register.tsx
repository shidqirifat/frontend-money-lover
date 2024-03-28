import FormRegister from "@/components/auth/FormRegister";
import { Logo } from "@/components/ui/logo";
import NotAuthLayout from "@/layouts/NotAuthLayout";
import ROUTES from "@/lib/route";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <NotAuthLayout>
      <div className="bg-green-700 h-[30vh] relative">
        <div className="scale-[2] absolute top-[40%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
          <Logo />
        </div>
      </div>
      <div className="bg-white max-w-sm w-[90vw] mx-auto relative -top-14 py-8 px-6 rounded-lg">
        <h1 className="text-2xl font-bold text-black leading-6 text-center">
          Register
        </h1>

        <FormRegister />

        <div className="mt-4">
          <h3 className="text-slate-700 text-sm leading-5 font-normal">
            Have an account?{" "}
            <Link
              href={ROUTES.LOGIN()}
              className="underline underline-offset-2 text-sky-500"
            >
              Login
            </Link>
          </h3>
        </div>
      </div>
    </NotAuthLayout>
  );
}
