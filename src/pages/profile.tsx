import AuthLayout from "@/layouts/AuthLayout";
import {
  Form,
  FormControl,
  FormDescription,
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
import { TFormProfile, formProfileSchema } from "@/lib/auth";
import useAuth from "@/queries/useAuth";
import { useEffect, useState } from "react";

type ModeForm = "detail" | "edit";

export default function Home() {
  const [mode, setMode] = useState<ModeForm>("detail");
  const { authUserQuery, updateUserMutation } = useAuth();
  const form = useForm<TFormProfile>({
    resolver: zodResolver(formProfileSchema),
  });

  const onSubmit = (form: TFormProfile) => {
    updateUserMutation.mutate(form);
  };

  const resetForm = () => {
    const auth = authUserQuery.data?.data;
    if (!auth) return;

    form.reset({
      name: auth.name,
      email: auth.email,
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => resetForm(), [authUserQuery.data?.data]);

  return (
    <AuthLayout hideTransaction>
      <div className="p-12 bg-white rounded-md shadow-md mt-20 max-w-lg w-[90vw] mx-auto">
        <h1 className="text-3xl text-green-500 font-bold leading-7">
          Profile User
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 !mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert name"
                      disabled={mode === "detail"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert email"
                      disabled={mode === "detail"}
                      {...field}
                    />
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
                    <InputPassword
                      placeholder="Insert password"
                      disabled={mode === "detail"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Insert password if you want to change the password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Insert confirm password"
                      disabled={mode === "detail"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="!mt-6">
              {mode === "detail" ? (
                <Button
                  type="button"
                  color="green"
                  onClick={() => setMode("edit")}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={updateUserMutation.isPending}
                    onClick={() => {
                      setMode("detail");
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="green"
                    disabled={updateUserMutation.isPending}
                  >
                    Save Profile
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
