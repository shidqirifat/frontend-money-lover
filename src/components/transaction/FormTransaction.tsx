import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { CATEGORIES, SUBCATEGORIES } from "@/data/category";
import { toDatalist } from "@/lib/datalist";
import { WALLETS } from "@/data/wallet";
import { formatNominal } from "@/lib/currency";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TFormTransaction,
  formTransactionSchema,
  generateDefaultValueFormTransaction,
} from "@/lib/transaction";

type FormTransactionProps = {
  openModal: boolean;
};

export default function FormTransaction({ openModal }: FormTransactionProps) {
  const form = useForm<TFormTransaction>({
    resolver: zodResolver(formTransactionSchema),
  });

  function onSubmit(values: TFormTransaction) {
    console.log(values);
  }

  const [category] = form.watch(["category"]);

  const subCategories = useMemo(() => {
    if (!category) return [];

    const subCategoriesSelected = SUBCATEGORIES.find(
      (item) => item.id === category.value
    )?.subCategories;

    if (!subCategoriesSelected || subCategoriesSelected.length === 0) return [];

    return toDatalist(subCategoriesSelected);
  }, [category]);

  useEffect(() => {
    if (category) form.clearErrors("category");
  }, [category]);

  useEffect(() => {
    if (openModal) form.reset(generateDefaultValueFormTransaction());
  }, [openModal]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 !mt-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  leftIcon="Rp"
                  {...field}
                  onChange={(event) => {
                    const { value } = event.target;
                    if (Boolean(value.match(/[^0-9.]/g))) return;

                    form.setValue("amount", formatNominal(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <div>
                  <Combobox
                    options={toDatalist(CATEGORIES)}
                    selected={field.value}
                    placeholder="Select category"
                    {...field}
                    onChange={(selected) => {
                      if (selected) form.setValue("category", selected);
                      form.setValue("subCategory", null);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category</FormLabel>
              <FormControl>
                <div>
                  <Combobox
                    options={subCategories}
                    selected={field.value}
                    placeholder="Select category"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet</FormLabel>
              <FormControl>
                <div>
                  <Combobox
                    options={toDatalist(WALLETS)}
                    selected={field.value}
                    placeholder="Select sub category"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" color="green" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
