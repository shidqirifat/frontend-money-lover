import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormLogin, formLoginSchema } from "@/lib/auth";
import useAuth from "@/queries/useAuth";

export default function FormLogin() {
  const { loginMutation } = useAuth();

  const form = useForm<TFormLogin>({
    resolver: zodResolver(formLoginSchema),
  });

  function onSubmit(form: TFormLogin) {
    loginMutation.mutate(form);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 !mt-4">
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
  );
}
