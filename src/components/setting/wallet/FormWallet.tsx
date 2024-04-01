import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatNominal } from "@/lib/currency";
import { TFormWallet, WalletResponse, formWalletSchema } from "@/lib/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalDeleteWallet from "./ModalDeleteWallet";
import { UseMutationResult } from "@tanstack/react-query";

type FormWalletProps = {
  initialForm?: WalletResponse | null;
  type: "add" | "edit";
  mutation: UseMutationResult;
};

export default function FormWallet({
  initialForm,
  type,
  mutation,
}: FormWalletProps) {
  const form = useForm<TFormWallet>({
    resolver: zodResolver(formWalletSchema),
    defaultValues: {
      balance: "0",
    },
  });

  const onSubmit = (form: TFormWallet) => {
    if (type === "add") mutation?.mutate(form);
  };

  useEffect(() => {
    if (!initialForm) return;

    form.reset({
      name: initialForm.name,
      balance: formatNominal(initialForm.balance),
    });
  }, [initialForm]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 !mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Name</FormLabel>
              <FormControl>
                <Input placeholder="Insert wallet name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  leftIcon="Rp"
                  {...field}
                  onChange={(event) => {
                    const { value } = event.target;
                    if (Boolean(value.match(/[^0-9.]/g))) return;

                    form.setValue("balance", formatNominal(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "add" ? (
          <Button
            color="green"
            className="w-full"
            disabled={mutation.isPending}
          >
            Submit Add Wallet
          </Button>
        ) : (
          <div className="space-y-2">
            <Button color="green" className="w-full">
              Submit Edit Wallet
            </Button>
            <ModalDeleteWallet />
          </div>
        )}
      </form>
    </Form>
  );
}
