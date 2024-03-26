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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TFormTransaction,
  Transaction,
  TypeForm,
  formTransactionSchema,
  generateDefaultValueFormTransaction,
  generateInitialValueFormTransaction,
} from "@/lib/transaction";
import { DatePicker } from "../ui/date-picker";
import FormButton from "./FormButton";
import { UseMutationResult } from "@tanstack/react-query";

type FormTransactionProps = {
  initialForm?: Transaction | null;
  openModal: boolean;
  type: TypeForm;
  setTypeForm?: (type: TypeForm) => void;
  mutation?: UseMutationResult;
};

export default function FormTransaction({
  initialForm,
  openModal,
  type,
  setTypeForm,
  mutation,
}: FormTransactionProps) {
  const form = useForm<TFormTransaction>({
    resolver: zodResolver(formTransactionSchema),
  });

  const onSubmit = (form: TFormTransaction) => {
    if (type === "add") mutation?.mutate(form);
    else mutation?.mutate({ payload: form, id: initialForm?.id as number });
  };

  const [category] = form.watch(["category"]);

  const assignInitFormValue = () => {
    if (!initialForm) form.reset(generateDefaultValueFormTransaction());
    else form.reset(generateInitialValueFormTransaction(initialForm));
  };

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
    if (openModal) assignInitFormValue();
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
                  disabled={type === "detail"}
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
                    disabled={type === "detail"}
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
                    disabled={type === "detail"}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write note"
                  disabled={type === "detail"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <div>
                  <DatePicker
                    {...field}
                    disabled={type === "detail"}
                    value={field.value}
                    onChange={(date) => form.setValue("date", date)}
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
                    disabled={type === "detail"}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton
          type={type}
          disabled={mutation?.isPending}
          onToggleEdit={() => setTypeForm && setTypeForm("edit")}
          onCancel={() => {
            if (setTypeForm) setTypeForm("detail");
            assignInitFormValue();
            form.clearErrors();
          }}
        />
      </form>
    </Form>
  );
}
