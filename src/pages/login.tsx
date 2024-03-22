import { Logo } from "@/components/ui/logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormLogin, formLoginSchema } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const form = useForm<TFormLogin>({
    resolver: zodResolver(formLoginSchema),
  });

  function onSubmit(values: TFormLogin) {
    console.log(values);
  }

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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 !mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Insert email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword placeholder="Insert password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" color="green" className="w-full">
              Login
            </Button>
          </form>
        </Form>

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
