import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Option = {
  label: string;
  value: string;
} | null;

type ComboboxProps = {
  options: Array<Option>;
  selected: Option;
  onChange: (option: Option) => void;
  placeholder?: string;
};

export function Combobox({
  options,
  selected,
  onChange,
  placeholder,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between h-10", {
            "text-slate-500 font-normal": !selected,
          })}
        >
          {selected
            ? options.find((option) => option?.value === selected.value)?.label
            : placeholder || "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder || "Select option..."} />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={option?.value}
                  value={option?.label}
                  onSelect={() => {
                    onChange(selected?.value === option?.value ? null : option);
                    setOpen(false);
                  }}
                >
                  {option?.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected?.value === option?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
