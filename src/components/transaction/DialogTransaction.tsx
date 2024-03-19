import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dayjs from "dayjs";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Combobox } from "../ui/combobox";
import { CATEGORIES, SUBCATEGORIES } from "@/data/category";
import { useEffect, useMemo } from "react";
import { toDatalist } from "@/lib/datalist";
import { WALLETS } from "@/data/wallet";
import { formatNominal } from "@/lib/currency";

const optionSchema = z.object({
  label: z.string(),
  value: z.number(),
});

const formSchema = z.object({
  amount: z.string().regex(/^[\d.]+$/, {
    message: "Only numbers is allowed.",
  }),
  description: z.string(),
  date: z.string().datetime(),
  wallet: optionSchema,
  category: z.object(
    {
      label: z.string(),
      value: z.number(),
    },
    { required_error: "Category is required" }
  ),
  subCategory: optionSchema.nullable(),
});

export default function DialogTransaction() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: dayjs().toISOString(),
      wallet: toDatalist(WALLETS)[0],
      subCategory: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger>
        <Button
          asChild
          color="green"
          className="p-2 shadow-lg rounded-full h-12 w-12 fixed right-8 bottom-8"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] max-w-sm top-[42%]">
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 !mt-4"
            >
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
                          if (value.match(/[^0-9.]/g)) return;

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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
